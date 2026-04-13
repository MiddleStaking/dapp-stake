import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import {
  useGetAccount,
  useGetNetworkConfig,
  Address,
  Transaction,
  GAS_PRICE,
} from 'lib';
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
  poolCount: number;
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

function intSqrt(n: bigint): bigint {
  if (n < BigInt(0)) throw new Error('Square root of negative number');
  if (n < BigInt(2)) return n;
  let x = n;
  let y = (x + BigInt(1)) / BigInt(2);
  while (y < x) { x = y; y = (x + n / x) / BigInt(2); }
  return x;
}

const TokenSelect = ({
  value, onChange, tokens, exclude, loading,
}: {
  value: DexToken | null;
  onChange: (t: DexToken | null) => void;
  tokens: DexToken[];
  exclude?: string;
  loading: boolean;
}) => (
  <select
    className="flex-1 rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
    value={value?.identifier ?? ''}
    disabled={loading}
    onChange={(e) => {
      const found = tokens.find((t) => t.identifier === e.target.value) ?? null;
      onChange(found);
    }}
  >
    <option value="">{loading ? 'Chargement…' : 'Choisir un token'}</option>
    {tokens.filter((t) => t.identifier !== exclude).map((t) => (
      <option key={t.identifier} value={t.identifier}>{t.ticker}</option>
    ))}
  </select>
);

export const AddLiquidity = () => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlInitDoneRef = useRef(false);

  const [tokens, setTokens] = useState<DexToken[]>([]);
  const [hubTokens, setHubTokens] = useState<DexToken[]>([]);
  const [tokensLoading, setTokensLoading] = useState(true);

  const [tokenA, setTokenA] = useState<DexToken | null>(null);
  const [tokenB, setTokenB] = useState<DexToken | null>(null);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const lastEdited = useRef<'A' | 'B'>('A');

  const [pool, setPool] = useState<PoolInfo | null>(null);
  const [poolLoading, setPoolLoading] = useState(false);
  const [lpPreview, setLpPreview] = useState<bigint | null>(null);
  const [refundA, setRefundA] = useState(BigInt(0));
  const [refundB, setRefundB] = useState(BigInt(0));
  const [lpTokenIds, setLpTokenIds] = useState<Set<string>>(new Set());

  const allWalletTokensRaw = useGetUserESDT(undefined, { enabled: !!address });
  const [walletTokens, setWalletTokens] = useState<DexToken[]>([]);

  const tokenBChoices = React.useMemo(() => {
    const base = (walletTokens.length > 0 ? walletTokens : []).filter(t => !lpTokenIds.has(t.identifier));
    if (tokenB && !base.some(t => t.identifier === tokenB.identifier)) {
      return [tokenB, ...base];
    }
    return base;
  }, [walletTokens, tokenB, lpTokenIds]);

  useEffect(() => {
    if (!allWalletTokensRaw || allWalletTokensRaw.length === 0) { setWalletTokens([]); return; }
    const extract = async () => {
      const enriched = await Promise.allSettled(
        allWalletTokensRaw.map(async (t: any) => {
          try {
            const { data } = await axios.get(`/tokens/${t.identifier}`, { baseURL: network.apiAddress });
            return { identifier: t.identifier, ticker: t.ticker || t.identifier.split('-')[0], decimals: data.decimals ?? 18 };
          } catch {
            return { identifier: t.identifier, ticker: t.ticker || t.identifier.split('-')[0], decimals: 18 };
          }
        })
      );
      setWalletTokens(enriched.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean) as DexToken[]);
    };
    extract();
  }, [allWalletTokensRaw, network.apiAddress]);

  const balancesA = useGetUserESDT(tokenA?.identifier ?? undefined, { enabled: !!tokenA && !!address });
  const balancesB = useGetUserESDT(tokenB?.identifier ?? undefined, { enabled: !!tokenB && !!address });

  const balanceRawA = balancesA?.[0]?.balance ?? '0';
  const balanceRawB = balancesB?.[0]?.balance ?? '0';
  const balanceDisplayA = tokenA && balanceRawA ? new BigNumber(balanceRawA).shiftedBy(-tokenA.decimals).toFixed(6, BigNumber.ROUND_DOWN) : '0';
  const balanceDisplayB = tokenB && balanceRawB ? new BigNumber(balanceRawB).shiftedBy(-tokenB.decimals).toFixed(6, BigNumber.ROUND_DOWN) : '0';

  useEffect(() => {
    if (!swap_api) return;
    setTokensLoading(true);
    const fetchTokens = async () => {
      try {
        const [tokensRes, hubTokensRes, poolsRes] = await Promise.all([
          axios.get(`${swap_api}/tokens`),
          axios.get(`${swap_api}/tokens/hub`).catch(() => ({ data: [] })),
          axios.get(`${swap_api}/pools`).catch(() => ({ data: { pools: [] } })),
        ]);
        const lpIds = new Set<string>((poolsRes.data.pools as PoolInfo[]).map((p) => p.lpToken).filter(Boolean));
        setLpTokenIds(lpIds);
        const raw = tokensRes.data.tokens || [];
        const hubItems = hubTokensRes.data?.hubTokens || [];
        const hubList: string[] = hubItems.map((h: any) => h.identifier);
        const combinedRaw = [...raw];
        for (const ht of hubItems) {
          if (!combinedRaw.find((t: any) => t.identifier === ht.identifier)) {
            combinedRaw.push({ identifier: ht.identifier, ticker: ht.ticker, poolCount: 0 });
          }
        }
        const enriched = await Promise.allSettled(
          combinedRaw.map(async (t: any) => {
            try {
              const { data } = await axios.get(`/tokens/${t.identifier}`, { baseURL: network.apiAddress });
              return { ...t, decimals: data.decimals ?? 18 };
            } catch { return { ...t, decimals: 18 }; }
          })
        );
        const validTokens = (enriched.map((r) => r.status === 'fulfilled' ? r.value : null).filter(Boolean) as DexToken[]).filter((t) => !lpIds.has(t.identifier));
        setTokens(validTokens);
        setHubTokens(validTokens.filter(t => hubList.includes(t.identifier)));
      } catch (err) { console.error(err); }
      finally { setTokensLoading(false); }
    };
    fetchTokens();
  }, [network.apiAddress]);

  useEffect(() => {
    if (tokens.length === 0) return;
    const qA = searchParams.get('tokenA');
    const qB = searchParams.get('tokenB');
    if (qA && !tokenA) setTokenA(tokens.find(t => t.identifier === qA) || null);
    if (qB && !tokenB) setTokenB(tokens.find(t => t.identifier === qB) || null);
    urlInitDoneRef.current = true;
  }, [tokens]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!urlInitDoneRef.current) return;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tokenA) next.set('tokenA', tokenA.identifier); else next.delete('tokenA');
      if (tokenB) next.set('tokenB', tokenB.identifier); else next.delete('tokenB');
      return next;
    }, { replace: true });
  }, [tokenA, tokenB]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!tokenA || !tokenB) { setPool(null); return; }
    setPoolLoading(true);
    axios.get(`${swap_api}/pools`).then((res) => {
      const pools: PoolInfo[] = res.data.pools || [];
      const found = pools.find(p =>
        (p.tokenA === tokenA.identifier && p.tokenB === tokenB.identifier) ||
        (p.tokenA === tokenB.identifier && p.tokenB === tokenA.identifier)
      );
      setPool(found || null);
    }).catch(console.error).finally(() => setPoolLoading(false));
  }, [tokenA, tokenB]);

  const handleAmountA = (val: string) => {
    setAmountA(val);
    lastEdited.current = 'A';
    if (pool && tokenA && tokenB && pool.lpSupply !== '0' && val) {
      const isA = pool.tokenA === tokenA.identifier;
      const resA = BigInt(isA ? pool.reserveA : pool.reserveB);
      const resB = BigInt(isA ? pool.reserveB : pool.reserveA);
      const amtA = BigInt(new BigNumber(val).shiftedBy(tokenA.decimals).toFixed(0));
      if (resA > BigInt(0)) {
        const amtB = (amtA * resB) / resA;
        setAmountB(new BigNumber(amtB.toString()).shiftedBy(-tokenB.decimals).toFixed(6, BigNumber.ROUND_UP));
      }
    }
  };

  const handleAmountB = (val: string) => {
    setAmountB(val);
    lastEdited.current = 'B';
    if (pool && tokenA && tokenB && pool.lpSupply !== '0' && val) {
      const isB = pool.tokenB === tokenB.identifier;
      const resB = BigInt(isB ? pool.reserveB : pool.reserveA);
      const resA = BigInt(isB ? pool.reserveA : pool.reserveB);
      const amtB = BigInt(new BigNumber(val).shiftedBy(tokenB.decimals).toFixed(0));
      if (resB > BigInt(0)) {
        const amtA = (amtB * resA) / resB;
        setAmountA(new BigNumber(amtA.toString()).shiftedBy(-tokenA.decimals).toFixed(6, BigNumber.ROUND_UP));
      }
    }
  };

  useEffect(() => {
    if (!tokenA || !tokenB || !amountA || !amountB || Number(amountA) <= 0 || Number(amountB) <= 0) {
      setLpPreview(null); setRefundA(BigInt(0)); setRefundB(BigInt(0)); return;
    }
    const aAmt = BigInt(new BigNumber(amountA).shiftedBy(tokenA.decimals).toFixed(0));
    const bAmt = BigInt(new BigNumber(amountB).shiftedBy(tokenB.decimals).toFixed(0));
    if (!pool || pool.lpSupply === '0') {
      setLpPreview(intSqrt(aAmt * bAmt)); setRefundA(BigInt(0)); setRefundB(BigInt(0));
    } else {
      const isA = pool.tokenA === tokenA.identifier;
      const pAmtA = isA ? aAmt : bAmt;
      const pAmtB = isA ? bAmt : aAmt;
      const resA = BigInt(pool.reserveA);
      const resB = BigInt(pool.reserveB);
      const lpSupply = BigInt(pool.lpSupply);
      const lpFromA = (pAmtA * lpSupply) / resA;
      const lpFromB = (pAmtB * lpSupply) / resB;
      if (lpFromA <= lpFromB) {
        setLpPreview(lpFromA);
        const uB = (pAmtA * resB) / resA;
        setRefundA(isA ? BigInt(0) : pAmtB - uB);
        setRefundB(isA ? pAmtB - uB : BigInt(0));
      } else {
        setLpPreview(lpFromB);
        const uA = (pAmtB * resA) / resB;
        setRefundA(isA ? pAmtA - uA : BigInt(0));
        setRefundB(isA ? BigInt(0) : pAmtA - uA);
      }
    }
  }, [amountA, amountB, pool, tokenA, tokenB]);

  const handleTx = async () => {
    if (!pool || !tokenA || !tokenB || !address || !amountA || !amountB) return;
    try {
      const aAmt = BigInt(new BigNumber(amountA).shiftedBy(tokenA.decimals).toFixed(0));
      const bAmt = BigInt(new BigNumber(amountB).shiftedBy(tokenB.decimals).toFixed(0));
      const receiver = new Address(pool.address);
      const senderAddr = new Address(address);
      const txDataParts = [
        'MultiESDTNFTTransfer', receiver.toHex(), '02',
        strToHex(tokenA.identifier), '00', bigToHex(aAmt),
        strToHex(tokenB.identifier), '00', bigToHex(bAmt),
        strToHex('addLiquidity'), bigToHex(BigInt(0)), bigToHex(BigInt(0)),
      ];
      const transaction = new Transaction({
        value: BigInt(0),
        data: new TextEncoder().encode(txDataParts.join('@')),
        receiver: senderAddr,
        sender: senderAddr,
        gasLimit: BigInt(15_000_000),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });
      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: 'Ajout de liquidité en cours...',
          errorMessage: "L'ajout a échoué",
          successMessage: 'Liquidité ajoutée !',
        },
      });
      setAmountA(''); setAmountB('');
    } catch (err: any) { console.error(err); }
  };

  const aErr = !!(amountA && new BigNumber(amountA).shiftedBy(tokenA?.decimals ?? 18).isGreaterThan(balanceRawA));
  const bErr = !!(amountB && new BigNumber(amountB).shiftedBy(tokenB?.decimals ?? 18).isGreaterThan(balanceRawB));

  return (
    <PageTemplate title='Ajouter de la liquidité' subtitle='Ajouter de la liquidité à une pool' maxWidth='640px'>
      <div className='flex flex-col w-full gap-6'>
        <Card
          title={
            <div className='flex items-center gap-3 w-full'>
              <button onClick={() => navigate(RouteNamesEnum.liquidity)} className='p-1.5 bg-black/30 rounded-lg hover:bg-purple-900/30 transition flex-shrink-0'>
                <ArrowLeft className='w-4 h-4 text-white/70' />
              </button>
              <span className='text-xl'>➕</span>
              <span className='text-lg font-black tracking-tight whitespace-nowrap'>Ajouter Liquidité</span>
            </div>
          }
          description='Déposez deux tokens pour fournir de la liquidité et recevoir des LP tokens'
        >
          <div className='space-y-2 mt-4'>
            <div className='rounded-2xl border border-[#695885]/40 bg-black/30 p-4'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-[10px] font-semibold uppercase tracking-wider text-white/40'>Premier Token</p>
                <p className='text-[10px] font-semibold uppercase tracking-wider text-white/50'>Balance: {balanceDisplayA}</p>
              </div>
              <div className='flex items-center gap-3'>
                <TokenSelect value={tokenA} onChange={setTokenA} tokens={hubTokens} exclude={tokenB?.identifier} loading={tokensLoading} />
                <input type='number' min='0' placeholder='0.0' value={amountA} onChange={(e) => handleAmountA(e.target.value)}
                  className={`w-28 xs:w-36 flex-shrink-0 rounded-xl border bg-black/20 px-3 py-2.5 text-right text-sm font-semibold text-white focus:outline-none focus:ring-2 ${aErr ? 'border-red-500 focus:ring-red-500' : 'border-[#695885]/50 focus:ring-purple-500'}`}
                />
              </div>
            </div>

            <div className='flex justify-center -my-3 relative z-10'>
              <div className='rounded-full p-1.5 bg-black/40 border border-[#695885]/40'>
                <Plus className='w-4 h-4 text-[#BD37EC]' />
              </div>
            </div>

            <div className='rounded-2xl border border-[#695885]/40 bg-black/30 p-4'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-[10px] font-semibold uppercase tracking-wider text-white/40'>Deuxième Token</p>
                <p className='text-[10px] font-semibold uppercase tracking-wider text-white/50'>Balance: {balanceDisplayB}</p>
              </div>
              <div className='flex items-center gap-3'>
                <TokenSelect value={tokenB} onChange={setTokenB} tokens={tokenBChoices} exclude={tokenA?.identifier} loading={tokensLoading || (allWalletTokensRaw.length > 0 && walletTokens.length === 0)} />
                <input type='number' min='0' placeholder='0.0' value={amountB} onChange={(e) => handleAmountB(e.target.value)}
                  className={`w-28 xs:w-36 flex-shrink-0 rounded-xl border bg-black/20 px-3 py-2.5 text-right text-sm font-semibold text-white focus:outline-none focus:ring-2 ${bErr ? 'border-red-500 focus:ring-red-500' : 'border-[#695885]/50 focus:ring-purple-500'}`}
                />
              </div>
            </div>

            {poolLoading && <p className='text-center text-xs text-white/40 mt-4 animate-pulse'>Recherche de la pool en cours...</p>}

            {!poolLoading && tokenA && tokenB && !pool && (
              <div className='rounded-xl border border-purple-500/30 bg-purple-900/20 p-4 mt-4'>
                <p className='text-sm font-semibold text-purple-300'>Aucune pool trouvée</p>
                <p className='text-xs text-purple-300/70 mt-1'>Vous devez créer cette pool avant de pouvoir y ajouter de la liquidité. L'activation requiert 0.05 EGLD.</p>
                <button onClick={() => navigate(`${RouteNamesEnum.createPool}?tokenX=${tokenA?.identifier ?? ''}&tokenY=${tokenB?.identifier ?? ''}`)} className='mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition'>Créer la pool</button>
              </div>
            )}

            {pool && lpPreview !== null && (
              <div className='rounded-2xl border border-[#695885]/30 bg-black/30 p-4 mt-4 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/50'>LP Reçus (est.)</span>
                  <span className='font-bold text-[#BD37EC]'>{new BigNumber(lpPreview.toString()).shiftedBy(-18).toFixed(6)} LP</span>
                </div>
                {refundA > BigInt(0) && (
                  <div className='flex justify-between text-xs'>
                    <span className='text-white/50'>Remboursement {tokenA?.ticker}</span>
                    <span className='font-medium text-white/70'>{new BigNumber(refundA.toString()).shiftedBy(-(tokenA?.decimals ?? 18)).toFixed(6)}</span>
                  </div>
                )}
                {refundB > BigInt(0) && (
                  <div className='flex justify-between text-xs'>
                    <span className='text-white/50'>Remboursement {tokenB?.ticker}</span>
                    <span className='font-medium text-white/70'>{new BigNumber(refundB.toString()).shiftedBy(-(tokenB?.decimals ?? 18)).toFixed(6)}</span>
                  </div>
                )}
                {lpPreview < BigInt(1000) && pool.lpSupply === '0' && (
                  <p className='text-xs text-red-400 mt-2'>Dépôt minimum insuffisant pour la première liquidité.</p>
                )}
              </div>
            )}

            <button
              onClick={handleTx}
              disabled={!pool || !pool.isActive || aErr || bErr || !amountA || !amountB || (lpPreview !== null && lpPreview < BigInt(1000) && pool.lpSupply === '0')}
              className='dinoButton w-full !py-3 text-base mt-4 disabled:opacity-40 disabled:cursor-not-allowed'
            >
              {!address ? 'Connectez votre wallet'
                : !pool ? 'Pool inexistante'
                : !pool.isActive ? 'Pool inactive'
                : aErr || bErr ? 'Solde insuffisant'
                : !amountA || !amountB ? 'Renseignez un montant'
                : (lpPreview !== null && lpPreview < BigInt(1000) && pool.lpSupply === '0') ? 'Montant trop faible'
                : 'Ajouter Liquidité'}
            </button>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
