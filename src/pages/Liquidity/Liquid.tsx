import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';
import { useGetAccount } from 'lib';
import { useGetUserESDT } from 'helpers/useGetUserEsdt';
import { FormatAmount } from 'helpers/api/useGetEsdtInformations';
import { PageTemplate } from 'components/PageTemplate';
import { Card } from 'components/Card';
import axios from 'axios';
import { swap_api } from 'config';
import BigNumber from 'bignumber.js';

interface PoolInfo {
  address: string;
  tokenA: string;
  tokenB: string;
  lpToken: string;
  reserveA: string;
  reserveB: string;
  lpSupply: string;
  isActive: boolean;
}

export const Liquidity = () => {
  const navigate = useNavigate();
  const { address } = useGetAccount();

  const [pools, setPools] = React.useState<PoolInfo[]>([]);
  const [poolsLoading, setPoolsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!swap_api) return;
    setPoolsLoading(true);
    axios.get(`${swap_api}/pools`).then((res) => {
      setPools(res.data.pools || []);
    }).catch(console.error).finally(() => setPoolsLoading(false));
  }, []);

  const walletTokens = useGetUserESDT(undefined, { enabled: !!address });

  const userPositions = React.useMemo(() => {
    if (!walletTokens || walletTokens.length === 0 || pools.length === 0) return [];
    return pools.map(pool => {
      const balanceObj = walletTokens.find((wt: any) => wt.identifier === pool.lpToken);
      if (balanceObj && BigInt(balanceObj.balance) > BigInt(0)) {
        return { pool, balance: balanceObj.balance };
      }
      return null;
    }).filter(Boolean);
  }, [pools, walletTokens]);

  return (
    <PageTemplate
      title='Liquidité'
      subtitle='Gérer vos paires de liquidité'
      maxWidth='640px'
    >
      <div className='flex flex-col w-full gap-6'>
        <Card
          title={
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4'>
              <div className='flex items-center gap-3'>
                <span className='text-xl'>💧</span>
                <span className='text-lg font-black tracking-tight'>Liquidité</span>
              </div>
              <div className='flex gap-1 p-1 bg-black/40 rounded-xl shadow-inner w-full sm:w-auto'>
                <button
                  onClick={() => navigate(RouteNamesEnum.swap)}
                  className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-bold rounded-lg text-white/40 hover:text-white transition-all hover:bg-white/10'
                >
                  Swap
                </button>
                <button className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-black rounded-lg bg-purple-900/60 text-[#BD37EC] shadow-md transition-all'>
                  Liquidité
                </button>
                <button
                  onClick={() => navigate(RouteNamesEnum.pools)}
                  className='flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm font-bold rounded-lg text-white/40 hover:text-white transition-all hover:bg-white/10'
                >
                  Pools
                </button>
              </div>
            </div>
          }
          description='Vos positions de liquidité actives'
        >
          <div className='space-y-4 mt-4'>
            {!poolsLoading && userPositions.length === 0 ? (
              <div className='rounded-2xl border border-[#695885]/40 bg-black/30 p-6 text-center'>
                <p className='text-sm text-white/50 mb-4'>
                  Vos positions de liquidité apparaîtront ici.
                </p>
                <button
                  onClick={() => navigate(RouteNamesEnum.addLiquidity)}
                  className='dinoButton w-full !py-3 text-base'
                >
                  Ajouter de la liquidité
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {userPositions.map((pos: any) => {
                  const lpTokenTicker = pos.pool.lpToken.split('-')[0];
                  const displayBalance = new BigNumber(pos.balance).shiftedBy(-18).toFixed(6, BigNumber.ROUND_DOWN);
                  const lpSupply = pos.pool.lpSupply || '1';
                  const estimatedA = new BigNumber(pos.balance).multipliedBy(pos.pool.reserveA).dividedBy(lpSupply).toFixed(0, BigNumber.ROUND_DOWN);
                  const estimatedB = new BigNumber(pos.balance).multipliedBy(pos.pool.reserveB).dividedBy(lpSupply).toFixed(0, BigNumber.ROUND_DOWN);
                  return (
                    <div key={pos.pool.address} className='rounded-2xl border border-[#695885]/40 bg-black/20 p-4'>
                      <div className='flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-3'>
                        <div className='min-w-0'>
                          <div className='flex items-center gap-2 mb-0.5'>
                            <span className='font-bold text-white uppercase truncate'>{lpTokenTicker}</span>
                            <span className='text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 font-semibold border border-[#695885] flex-shrink-0'>LP</span>
                          </div>
                          <p className='text-xs text-white/50 font-medium truncate'>{pos.pool.tokenA.split('-')[0]} / {pos.pool.tokenB.split('-')[0]}</p>
                        </div>
                        <div className='xs:text-right w-full xs:w-auto'>
                          <p className='font-bold text-white mb-1'>{displayBalance} LP</p>
                          <div className='flex gap-3 xs:justify-end'>
                            <button
                              onClick={() => navigate(`${RouteNamesEnum.addLiquidity}?tokenA=${pos.pool.tokenA}&tokenB=${pos.pool.tokenB}`)}
                              className='text-xs font-bold text-green-400 hover:text-green-300 transition underline decoration-dashed'
                            >
                              Ajouter
                            </button>
                            <button
                              onClick={() => navigate(`${RouteNamesEnum.removeLiquidity}?pool=${pos.pool.address}`)}
                              className='text-xs font-bold text-red-400 hover:text-red-300 transition underline decoration-dashed'
                            >
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='rounded-xl bg-black/30 border border-[#695885]/30 px-3 py-2 text-xs'>
                          <p className='text-white/40 mb-0.5'>≈ {pos.pool.tokenA.split('-')[0]}</p>
                          <p className='font-bold text-white'>
                            <FormatAmount amount={estimatedA} identifier={pos.pool.tokenA} showIdentifier={false} />
                          </p>
                        </div>
                        <div className='rounded-xl bg-black/30 border border-[#695885]/30 px-3 py-2 text-xs'>
                          <p className='text-white/40 mb-0.5'>≈ {pos.pool.tokenB.split('-')[0]}</p>
                          <p className='font-bold text-white'>
                            <FormatAmount amount={estimatedB} identifier={pos.pool.tokenB} showIdentifier={false} />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button onClick={() => navigate(RouteNamesEnum.addLiquidity)} className='dinoButton w-full !py-3 text-base'>
                  Ajouter de la liquidité
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
