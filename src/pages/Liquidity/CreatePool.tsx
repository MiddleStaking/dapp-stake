import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
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
import { swap_api, factoryContractAddress } from 'config';
import { RouteNamesEnum } from 'localConstants';
import bigToHex from 'helpers/bigToHex';

interface DexToken {
  identifier: string;
  ticker: string;
}

interface PoolInfo {
  address: string;
  tokenA: string;
  tokenB: string;
  isActive: boolean;
}

const strToHex = (s: string) => Buffer.from(s, 'utf8').toString('hex');

export const CreatePool = () => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tokens, setTokens] = useState<DexToken[]>([]);
  const [hubTokens, setHubTokens] = useState<DexToken[]>([]);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [tokenX, setTokenX] = useState('');
  const [tokenY, setTokenY] = useState('');
  const [lpName, setLpName] = useState('');
  const [lpTicker, setLpTicker] = useState('');
  const [existingPool, setExistingPool] = useState<PoolInfo | null>(null);

  const allWalletTokensRaw = useGetUserESDT(undefined, { enabled: !!address });
  const [walletTokens, setWalletTokens] = useState<DexToken[]>([]);

  useEffect(() => {
    if (!allWalletTokensRaw || allWalletTokensRaw.length === 0) { setWalletTokens([]); return; }
    const extract = async () => {
      const enriched = await Promise.allSettled(
        allWalletTokensRaw.map(async (t: any) => ({ identifier: t.identifier, ticker: t.ticker || t.identifier.split('-')[0] }))
      );
      setWalletTokens(enriched.map((r) => (r.status === 'fulfilled' ? r.value : null)).filter(Boolean) as DexToken[]);
    };
    extract();
  }, [allWalletTokensRaw]);

  useEffect(() => {
    if (!swap_api) return;
    setTokensLoading(true);
    Promise.all([
      axios.get(`${swap_api}/tokens`),
      axios.get(`${swap_api}/tokens/hub`).catch(() => ({ data: [] })),
    ]).then(([tokensRes, hubRes]) => {
      const allTokens = tokensRes.data.tokens || [];
      const hubItems = hubRes.data?.hubTokens || [];
      const hubList: string[] = hubItems.map((h: any) => h.identifier);
      const combined = [...allTokens];
      for (const ht of hubItems) {
        if (!combined.find((c) => c.identifier === ht.identifier)) combined.push({ identifier: ht.identifier, ticker: ht.ticker });
      }
      setTokens(combined);
      setHubTokens(combined.filter((t: DexToken) => hubList.includes(t.identifier)));
    }).catch(console.error).finally(() => setTokensLoading(false));
  }, []);

  useEffect(() => {
    const qX = searchParams.get('tokenX');
    const qY = searchParams.get('tokenY');
    if (qX && !tokenX && tokens.length > 0)
      setTokenX(tokens.find((t) => t.identifier === qX)?.identifier ?? hubTokens.find((t) => t.identifier === qX)?.identifier ?? qX);
    if (qY && !tokenY && walletTokens.length > 0)
      setTokenY(walletTokens.find((t) => t.identifier === qY)?.identifier ?? qY);
  }, [tokens, hubTokens, walletTokens]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!tokenX || !tokenY) return;
    const allKnown = [...hubTokens, ...tokens, ...walletTokens];
    const getTicker = (id: string) => {
      const found = allKnown.find((t) => t.identifier === id);
      return (found ? found.ticker : id).split('-')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    };
    const splitBudget = (a: string, b: string, budget: number): [string, string] => {
      if (a.length + b.length <= budget) return [a, b];
      const half = Math.floor(budget / 2);
      return [a.slice(0, budget - half), b.slice(0, half)];
    };
    const tX = getTicker(tokenX);
    const tY = getTicker(tokenY);
    const [nX, nY] = splitBudget(tX, tY, 18);
    setLpName(nX + nY + 'LP');
    const [tkX, tkY] = splitBudget(tX, tY, 10);
    setLpTicker(tkX + tkY);
  }, [tokenX, tokenY, hubTokens, tokens, walletTokens]);

  const pollPools = async () => {
    if (!tokenX || !tokenY) return;
    try {
      const res = await axios.get(`${swap_api}/pools`);
      const pools = res.data.pools || [];
      const found = pools.find((p: PoolInfo) =>
        (p.tokenA === tokenX && p.tokenB === tokenY) || (p.tokenA === tokenY && p.tokenB === tokenX)
      );
      setExistingPool(found || null);
    } catch { /* */ }
  };

  useEffect(() => {
    pollPools();
    const interval = setInterval(pollPools, 5000);
    return () => clearInterval(interval);
  }, [tokenX, tokenY]); // eslint-disable-line react-hooks/exhaustive-deps

  const isValidName = lpName.length >= 3 && lpName.length <= 20 && /^[a-zA-Z0-9]+$/.test(lpName);
  const isValidTicker = lpTicker.length >= 3 && lpTicker.length <= 10 && /^[A-Z0-9]+$/.test(lpTicker);
  const canCreate = !!address && !!tokenX && !!tokenY && tokenX !== tokenY && isValidName && isValidTicker && !existingPool;
  const canIssue = !!address && !!existingPool && !existingPool.isActive;

  const handleCreatePair = async () => {
    if (!canCreate) return;
    try {
      const txDataParts = ['createPair', strToHex(tokenX), strToHex(tokenY), strToHex(lpName), strToHex(lpTicker)];
      const transaction = new Transaction({
        value: BigInt(0),
        data: new TextEncoder().encode(txDataParts.join('@')),
        receiver: new Address(factoryContractAddress),
        sender: new Address(address),
        gasLimit: BigInt(300000000),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });
      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: { processingMessage: 'Création de la pair en cours...', errorMessage: 'Création échouée', successMessage: 'Pair créée !' },
      });
    } catch (err) { console.error(err); }
  };

  const handleIssueLp = async () => {
    if (!canIssue) return;
    try {
      const txDataParts = ['issueLpToken', strToHex(tokenX), strToHex(tokenY)];
      const transaction = new Transaction({
        value: BigInt("50000000000000000"),
        data: new TextEncoder().encode(txDataParts.join('@')),
        receiver: new Address(factoryContractAddress),
        sender: new Address(address),
        gasLimit: BigInt(150000000),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });
      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: { processingMessage: 'Émission du LP Token...', errorMessage: 'Émission échouée', successMessage: 'LP Token émis !' },
      });
    } catch (err) { console.error(err); }
  };

  return (
    <PageTemplate title='Créer une Pool' subtitle='Créer une nouvelle paire de liquidité' maxWidth='640px'>
      <div className='flex flex-col w-full gap-6'>
        <Card
          title={
            <div className='flex items-center gap-3 w-full'>
              <button onClick={() => navigate(RouteNamesEnum.liquidity)} className='p-1.5 bg-black/30 rounded-lg hover:bg-purple-900/30 transition flex-shrink-0'>
                <ArrowLeft className='w-4 h-4 text-white/70' />
              </button>
              <span className='text-xl'>🏊</span>
              <span className='text-lg font-black tracking-tight'>Créer une Pool</span>
            </div>
          }
          description='Créez une nouvelle paire de liquidité en deux étapes'
        >
          <div className='space-y-4 mt-4'>
            <div className='rounded-2xl border border-[#695885]/40 bg-black/30 p-4 space-y-4'>
              <div>
                <label className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1 block'>Token 1</label>
                <select
                  className='w-full rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={tokenX} onChange={(e) => setTokenX(e.target.value)} disabled={tokensLoading || !!existingPool}
                >
                  <option value="">Sélectionner</option>
                  {hubTokens.filter((t) => t.identifier !== tokenY).map((t) => (
                    <option key={t.identifier} value={t.identifier}>{t.ticker} ({t.identifier})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1 block'>Token 2</label>
                <select
                  className='w-full rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  value={tokenY} onChange={(e) => setTokenY(e.target.value)} disabled={tokensLoading || !!existingPool || (allWalletTokensRaw.length > 0 && walletTokens.length === 0)}
                >
                  <option value="">Sélectionner</option>
                  {walletTokens.length > 0
                    ? walletTokens.filter((t) => t.identifier !== tokenX).map((t) => (
                        <option key={t.identifier} value={t.identifier}>{t.ticker} ({t.identifier})</option>
                      ))
                    : <option disabled>Aucun token en portefeuille</option>
                  }
                </select>
              </div>
              <div>
                <label className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1 block'>Nom LP (3-20 caractères)</label>
                <input
                  type='text' placeholder='ex: GRAOUUSDCLP' value={lpName} onChange={(e) => setLpName(e.target.value)} disabled={!!existingPool}
                  className={`w-full rounded-xl border bg-black/20 px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${!isValidName && lpName.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-[#695885]/50 focus:ring-purple-500'}`}
                />
              </div>
              <div>
                <label className='text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1 block'>Ticker LP (3-10 majuscules)</label>
                <input
                  type='text' placeholder='Ex: GRAOUSDC' value={lpTicker} onChange={(e) => setLpTicker(e.target.value.toUpperCase())} disabled={!!existingPool}
                  className={`w-full rounded-xl border bg-black/20 px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${!isValidTicker && lpTicker.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-[#695885]/50 focus:ring-purple-500'}`}
                />
              </div>
            </div>

            {!existingPool ? (
              <button onClick={handleCreatePair} disabled={!canCreate} className='dinoButton w-full !py-3 text-base mt-4 disabled:opacity-40 disabled:cursor-not-allowed'>
                Étape 1 : Créer la Pair SC
              </button>
            ) : !existingPool.isActive ? (
              <div className='rounded-xl border border-purple-500/30 bg-purple-900/20 p-4 mt-4 text-center'>
                <p className='text-sm font-semibold text-purple-300 mb-3'>La pair est créée !</p>
                <p className='text-xs text-purple-300/70 mb-4 text-left'>Pour activer la pool, le token LP doit être émis. Coût : 0.05 EGLD.</p>
                <button onClick={handleIssueLp} className='w-full px-4 py-3 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-500 transition shadow-sm'>
                  Étape 2 : Émettre le LP Token (0.05 EGLD)
                </button>
              </div>
            ) : (
              <div className='rounded-xl border border-green-500/30 bg-green-900/20 p-6 mt-4 text-center'>
                <CheckCircle className='w-12 h-12 text-green-400 mx-auto mb-3' />
                <p className='text-base font-bold text-green-400 mb-2'>Pool Active !</p>
                <p className='text-sm text-green-400/70 mb-4'>La pool est prête à recevoir de la liquidité.</p>
                <button onClick={() => navigate(`${RouteNamesEnum.addLiquidity}?tokenA=${tokenX}&tokenB=${tokenY}`)} className='w-full px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-500 transition shadow-sm'>
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
