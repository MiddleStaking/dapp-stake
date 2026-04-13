import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import {
  useGetAccount,
  useGetNetworkConfig,
  Address,
  Transaction,
  GAS_PRICE,
} from 'lib';
import { FormatAmount } from 'helpers/api/useGetEsdtInformations';
import { signAndSendTransactions } from 'helpers';
import { useGetUserESDT } from 'helpers/useGetUserEsdt';
import { PageTemplate } from 'components/PageTemplate';
import { Card } from 'components/Card';
import bigToHex from 'helpers/bigToHex';
import { swap_api } from 'config';
import { RouteNamesEnum } from 'localConstants';
import BigNumber from 'bignumber.js';

interface DexToken {
  identifier: string;
  ticker: string;
  decimals: number;
}

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

const strToHex = (s: string) => Buffer.from(s, 'utf8').toString('hex');

export const RemoveLiquidity = () => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const navigate = useNavigate();

  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [tokens, setTokens] = useState<Record<string, DexToken>>({});
  const [selectedPoolAddress, setSelectedPoolAddress] = useState<string>('');
  const [poolsLoading, setPoolsLoading] = useState(true);
  const [lpAmountInput, setLpAmountInput] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!swap_api) return;
    axios.get(`${swap_api}/tokens`).then(async (res) => {
      const raw = res.data.tokens || [];
      const tokenMap: Record<string, DexToken> = {};
      await Promise.allSettled(
        raw.map(async (t: any) => {
          try {
            const { data } = await axios.get(`/tokens/${t.identifier}`, { baseURL: network.apiAddress });
            tokenMap[t.identifier] = { ...t, decimals: data.decimals ?? 18 };
          } catch {
            tokenMap[t.identifier] = { ...t, decimals: 18 };
          }
        })
      );
      setTokens(tokenMap);
    }).catch(console.error);
  }, [network.apiAddress]);

  useEffect(() => {
    if (!swap_api) return;
    setPoolsLoading(true);
    axios.get(`${swap_api}/pools`).then((res) => {
      const activePools = (res.data.pools || []).filter((p: PoolInfo) => p.isActive);
      setPools(activePools);
      const qPool = searchParams.get('pool');
      if (qPool && activePools.some((p: PoolInfo) => p.address === qPool)) {
        setSelectedPoolAddress(qPool);
      }
    }).catch(console.error).finally(() => setPoolsLoading(false));
  }, [searchParams]);

  const selectedPool = pools.find(p => p.address === selectedPoolAddress);

  const lpTokenBalances = useGetUserESDT(selectedPool?.lpToken ?? undefined, { enabled: !!selectedPool && !!address });
  const lpBalanceRaw = lpTokenBalances?.[0]?.balance ?? '0';
  const lpBalanceDisplay = new BigNumber(lpBalanceRaw).shiftedBy(-18).toFixed(6, BigNumber.ROUND_DOWN);

  const handleMax = () => {
    if (!lpBalanceRaw || lpBalanceRaw === '0') return;
    setLpAmountInput(new BigNumber(lpBalanceRaw).shiftedBy(-18).toFixed(18, BigNumber.ROUND_DOWN).replace(/\.?0+$/, ''));
  };

  const outA = selectedPool && lpAmountInput
    ? BigInt(new BigNumber(lpAmountInput).shiftedBy(18).multipliedBy(selectedPool.reserveA).dividedBy(selectedPool.lpSupply || '1').toFixed(0, BigNumber.ROUND_DOWN))
    : BigInt(0);

  const outB = selectedPool && lpAmountInput
    ? BigInt(new BigNumber(lpAmountInput).shiftedBy(18).multipliedBy(selectedPool.reserveB).dividedBy(selectedPool.lpSupply || '1').toFixed(0, BigNumber.ROUND_DOWN))
    : BigInt(0);

  const handleTx = async () => {
    if (!selectedPool || !address || !lpAmountInput) return;
    try {
      const lpAmt = BigInt(new BigNumber(lpAmountInput).shiftedBy(18).toFixed(0));
      const receiver = new Address(selectedPool.address);
      const senderAddr = new Address(address);
      const txDataParts = [
        'ESDTTransfer',
        strToHex(selectedPool.lpToken),
        bigToHex(lpAmt),
        strToHex('removeLiquidity'),
        bigToHex(BigInt(0)),
        bigToHex(BigInt(0)),
      ];
      const transaction = new Transaction({
        value: BigInt(0),
        data: new TextEncoder().encode(txDataParts.join('@')),
        receiver: receiver,
        sender: senderAddr,
        gasLimit: BigInt(12000000),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });
      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: 'Retrait en cours...',
          errorMessage: 'Le retrait a échoué',
          successMessage: 'Liquidité retirée !',
        },
      });
      setLpAmountInput('');
    } catch (err: any) { console.error(err); }
  };

  const lpErr = !!(lpAmountInput && new BigNumber(lpAmountInput).shiftedBy(18).isGreaterThan(lpBalanceRaw));

  return (
    <PageTemplate title='Retirer de la liquidité' subtitle="Retirer votre liquidité d'une pool" maxWidth='640px'>
      <div className='flex flex-col w-full gap-6'>
        <Card
          title={
            <div className='flex items-center gap-3 w-full'>
              <button onClick={() => navigate(RouteNamesEnum.liquidity)} className='p-1.5 bg-black/30 rounded-lg hover:bg-purple-900/30 transition flex-shrink-0'>
                <ArrowLeft className='w-4 h-4 text-white/70' />
              </button>
              <span className='text-xl'>🔓</span>
              <span className='text-lg font-black tracking-tight'>Retirer Liquidité</span>
            </div>
          }
          description="Retirez vos LP tokens pour récupérer vos actifs"
        >
          <div className='space-y-4 mt-4'>
            <div className="rounded-2xl border border-[#695885]/40 bg-black/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">Sélectionner une Pool</p>
              <select
                className="w-full rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedPoolAddress}
                onChange={e => setSelectedPoolAddress(e.target.value)}
                disabled={poolsLoading}
              >
                <option value="">{poolsLoading ? 'Chargement...' : 'Choisir une pool'}</option>
                {pools.map(p => {
                  const tkA = tokens[p.tokenA]?.ticker || p.tokenA.split('-')[0];
                  const tkB = tokens[p.tokenB]?.ticker || p.tokenB.split('-')[0];
                  return <option key={p.address} value={p.address}>{tkA} - {tkB}</option>;
                })}
              </select>
            </div>

            {selectedPool && (
              <div className="rounded-2xl border border-[#695885]/40 bg-black/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Montant LP à retirer</p>
                  <button onClick={handleMax} className="text-[10px] font-semibold uppercase tracking-wider text-[#BD37EC] hover:text-purple-300 flex items-center gap-1">
                    MAX ({lpBalanceDisplay} LP)
                  </button>
                </div>
                <input
                  type="number" min="0" placeholder="0.0" value={lpAmountInput} onChange={e => setLpAmountInput(e.target.value)}
                  className={`w-full rounded-xl border bg-black/20 px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${lpErr ? 'border-red-500 focus:ring-red-500' : 'border-[#695885]/50 focus:ring-purple-500'}`}
                />
                {lpErr && <p className="mt-1 text-xs text-red-400">Solde LP insuffisant</p>}
              </div>
            )}

            {selectedPool && lpAmountInput && outA > BigInt(0) && outB > BigInt(0) && !lpErr && (
              <>
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="rounded-full p-1.5 bg-black/40 border border-[#695885]/40">
                    <ArrowDown className="w-4 h-4 text-[#BD37EC]" />
                  </div>
                </div>
                <div className="rounded-2xl border border-[#695885]/30 bg-black/30 p-4 space-y-3 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 text-center">Vous recevrez (estimation)</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-white">
                      <FormatAmount amount={new BigNumber(outA.toString()).toFixed(0, BigNumber.ROUND_DOWN)} identifier={selectedPool.tokenA} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-white">
                      <FormatAmount amount={new BigNumber(outB.toString()).toFixed(0, BigNumber.ROUND_DOWN)} identifier={selectedPool.tokenB} />
                    </span>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={handleTx}
              disabled={!selectedPool || !address || !lpAmountInput || lpErr}
              className="dinoButton w-full !py-3 text-base mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {!address ? 'Connectez votre wallet'
                : !selectedPool ? "Sélectionnez une pool"
                : !lpAmountInput ? 'Renseignez un montant'
                : lpErr ? "Solde insuffisant"
                : 'Retirer Liquidité'}
            </button>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
