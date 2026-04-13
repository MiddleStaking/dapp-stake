import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { RouteNamesEnum } from 'localConstants';
import { PageTemplate } from 'components/PageTemplate';
import { Card } from 'components/Card';
import { swap_api } from 'config';

interface PoolInfo {
  address: string;
  tokenA: string;
  tokenB: string;
  lpToken: string;
  reserveA: string;
  reserveB: string;
  lpSupply: string;
  isActive: boolean;
  dexType?: string;
}

interface TokenMeta {
  identifier: string;
  ticker: string;
  decimals: number;
}

function formatReserve(raw: string, decimals: number): string {
  const bn = new BigNumber(raw).shiftedBy(-decimals);
  if (bn.isZero()) return '0';
  if (bn.gte(1_000_000)) return bn.toFormat(0);
  if (bn.gte(1000)) return bn.toFormat(2);
  if (bn.gte(1)) return bn.toFormat(4);
  return bn.toFormat(6);
}

export const Pools = () => {
  const navigate = useNavigate();

  const [pools, setPools] = React.useState<PoolInfo[]>([]);
  const [tokenMap, setTokenMap] = React.useState<Record<string, TokenMeta>>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!swap_api) return;
    Promise.all([
      axios.get(`${swap_api}/pools`),
      axios.get(`${swap_api}/tokens`),
    ]).then(([poolsRes, tokensRes]) => {
      const activePools: PoolInfo[] = (poolsRes.data.pools || []).filter((p: PoolInfo) => p.isActive);
      setPools(activePools);
      const map: Record<string, TokenMeta> = {};
      for (const t of (tokensRes.data.tokens || [])) {
        map[t.identifier] = { identifier: t.identifier, ticker: t.ticker ?? t.identifier.split('-')[0], decimals: t.decimals ?? 18 };
      }
      setTokenMap(map);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const getTicker = (id: string) => tokenMap[id]?.ticker ?? id.split('-')[0];
  const getDecimals = (id: string) => tokenMap[id]?.decimals ?? 18;

  return (
    <PageTemplate title='Pools' subtitle='Les pools de liquidité référencées par le routeur' maxWidth='720px'>
      <div className='flex flex-col w-full gap-6'>
        <Card
          title={
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4'>
              <div className='flex items-center gap-3'>
                <span className='text-xl'>🌊</span>
                <span className='text-lg font-black tracking-tight'>Pools</span>
              </div>
              <div className='flex gap-1 p-1 bg-black/40 rounded-xl shadow-inner w-full sm:w-auto overflow-x-auto'>
                <button onClick={() => navigate(RouteNamesEnum.swap)} className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-bold rounded-lg text-white/40 hover:text-white transition-all hover:bg-white/10 whitespace-nowrap'>
                  Swap
                </button>
                <button onClick={() => navigate(RouteNamesEnum.liquidity)} className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-bold rounded-lg text-white/40 hover:text-white transition-all hover:bg-white/10 whitespace-nowrap'>
                  Liquidité
                </button>
                <button className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-black rounded-lg bg-purple-900/60 text-[#BD37EC] shadow-md transition-all whitespace-nowrap'>
                  Pools
                </button>
              </div>
            </div>
          }
          description={loading ? 'Chargement...' : `${pools.length} pool${pools.length !== 1 ? 's' : ''} active${pools.length !== 1 ? 's' : ''}`}
        >
          <div className='space-y-3 mt-4'>
            {loading ? (
              <div className='flex justify-center py-10'>
                <div className='w-6 h-6 border-2 border-[#BD37EC] border-t-transparent rounded-full animate-spin' />
              </div>
            ) : pools.length === 0 ? (
              <p className='text-center text-sm text-white/50 py-8'>Aucune pool active trouvée.</p>
            ) : (
              pools.map((pool) => {
                const tickerA = getTicker(pool.tokenA);
                const tickerB = getTicker(pool.tokenB);
                const resA = formatReserve(pool.reserveA, getDecimals(pool.tokenA));
                const resB = formatReserve(pool.reserveB, getDecimals(pool.tokenB));
                return (
                  <div key={pool.address} className='rounded-2xl border border-[#695885]/40 bg-black/20 p-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <span className='font-black text-white text-base'>{tickerA} / {tickerB}</span>
                        <span className='text-[10px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 font-semibold border border-green-800 uppercase'>Active</span>
                      </div>
                      {(!pool.dexType || pool.dexType === 'DinoVox') && (
                        <button onClick={() => navigate(`${RouteNamesEnum.addLiquidity}?tokenA=${pool.tokenA}&tokenB=${pool.tokenB}`)} className='text-xs font-bold text-[#BD37EC] hover:text-purple-300 transition'>
                          + Ajouter
                        </button>
                      )}
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='rounded-xl bg-black/30 border border-[#695885]/30 px-3 py-2'>
                        <p className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5'>Réserve {tickerA}</p>
                        <p className='font-bold text-white text-sm'>{resA} <span className='text-white/40 font-medium'>{tickerA}</span></p>
                      </div>
                      <div className='rounded-xl bg-black/30 border border-[#695885]/30 px-3 py-2'>
                        <p className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5'>Réserve {tickerB}</p>
                        <p className='font-bold text-white text-sm'>{resB} <span className='text-white/40 font-medium'>{tickerB}</span></p>
                      </div>
                    </div>
                    <p className='text-[10px] text-white/30 mt-2 font-mono truncate'>{pool.address}</p>
                  </div>
                );
              })
            )}
            <button onClick={() => navigate(RouteNamesEnum.createPool)} className='dinoButton w-full !py-3 mt-2'>
              Créer une nouvelle pool
            </button>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
