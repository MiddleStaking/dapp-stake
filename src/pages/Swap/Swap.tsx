import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import { RouteNamesEnum } from 'localConstants';
import {
  useGetAccount,
  useGetAccountInfo,
  useGetNetworkConfig,
  Address,
  Transaction,
  GAS_PRICE,
} from 'lib';
import { signAndSendTransactions } from 'helpers';
import { useGetUserESDT } from 'helpers/useGetUserEsdt';
import { PageTemplate } from 'components/PageTemplate';
import { Card } from 'components/Card';
import { TokenSelect } from 'components/UI/TokenSelect';
import bigToHex from 'helpers/bigToHex';
import { swap_api } from 'config';
import BigNumber from 'bignumber.js';
import { wegld_identifier, BATCH_TRANSACTIONS_SC } from 'config';

const WRAP_CONTRACT = BATCH_TRANSACTIONS_SC.egld_wEGLD.contract;
/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface SwapToken {
  identifier: string;
  ticker: string;
  poolCount: number;
  decimals: number;
  logoUrl?: string | null;
}

interface QuoteTx {
  scAddress: string;
  txData: string;
  gasLimit: number;
  egldValue: string;
}

interface QuoteHop {
  pair: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  dexType?: 'DinoVox' | 'XExchange' | 'JExchange';
  priceImpact?: string;
}

interface QuoteResponse {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  priceImpact: string;
  hops: number;
  route: QuoteHop[];
  tx: QuoteTx;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */
const SLIPPAGE_PRESETS = [0.005, 0.01, 0.02]; // 0.5 %, 1 %, 2 %
const EGLD_TOKEN: SwapToken = {
  identifier: 'EGLD',
  ticker: 'EGLD',
  poolCount: 0,
  decimals: 18,
  logoUrl: null,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const strToHex = (s: string) => Buffer.from(s, 'utf8').toString('hex');

/** Apply slippage to an amountOut string (raw bigint string) */
const applySlippage = (rawAmount: string, slippage: number): bigint =>
  BigInt(
    new BigNumber(rawAmount)
      .multipliedBy(1 - slippage)
      .toFixed(0, BigNumber.ROUND_DOWN),
  );

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */

export const Swap = () => {
  const { address } = useGetAccount();
  const { account: accountInfo } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /* ---- Token list ---- */
  const [tokens, setTokens] = useState<SwapToken[]>([]);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [hubTokenIds, setHubTokenIds] = useState<Set<string>>(new Set());

  /* ---- Selection ---- */
  const [tokenIn, setTokenIn] = useState<SwapToken | null>(null);
  const [tokenOut, setTokenOut] = useState<SwapToken | null>(null);
  const urlInitDoneRef = useRef(false);
  const [amountIn, setAmountIn] = useState('');

  /* ---- Quote ---- */
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  /* ---- Settings ---- */
  const [slippage, setSlippage] = useState(0.01);

  /* ---- Tx state ---- */
  const [isSending, setIsSending] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);

  const quoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Balance tokenIn ---- */
  const [balanceLoading, setBalanceLoading] = useState(false);
  const isEgldIn = tokenIn?.identifier === 'EGLD';

  const tokenInBalances = useGetUserESDT(
    !isEgldIn ? tokenIn?.identifier : undefined,
    { enabled: !!tokenIn && !isEgldIn && !!address },
  );

  // Marque "en chargement" dès qu'on change de token
  useEffect(() => {
    if (tokenIn && address) setBalanceLoading(true);
    else setBalanceLoading(false);
  }, [tokenIn?.identifier]); // eslint-disable-line react-hooks/exhaustive-deps

  // Marque "chargé" dès que le hook répond
  useEffect(() => {
    setBalanceLoading(false);
  }, [tokenInBalances]);

  const tokenInBalanceRaw: string | null = isEgldIn
    ? accountInfo?.balance ?? null
    : tokenInBalances?.[0]?.balance ?? null;

  const tokenInBalanceDisplay =
    tokenInBalanceRaw && tokenIn
      ? new BigNumber(tokenInBalanceRaw)
          .shiftedBy(-tokenIn.decimals)
          .toFixed(6, BigNumber.ROUND_DOWN)
      : null;

  // Après chargement, "absent du wallet" === balance 0
  const effectiveBalanceRaw =
    !balanceLoading && address && tokenIn
      ? tokenInBalanceRaw ?? '0'
      : tokenInBalanceRaw;

  const insufficientBalance =
    !!effectiveBalanceRaw && !!amountIn && Number(amountIn) > 0
      ? new BigNumber(amountIn)
          .shiftedBy(tokenIn?.decimals ?? 18)
          .isGreaterThan(effectiveBalanceRaw)
      : false;

  /* ---- Balance tokenOut ---- */
  const isEgldOut_balance = tokenOut?.identifier === 'EGLD';
  const tokenOutBalances = useGetUserESDT(
    !isEgldOut_balance ? tokenOut?.identifier : undefined,
    { enabled: !!tokenOut && !isEgldOut_balance && !!address },
  );
  const tokenOutBalanceRaw: string | null = isEgldOut_balance
    ? accountInfo?.balance ?? null
    : tokenOutBalances?.[0]?.balance ?? null;
  const tokenOutBalanceDisplay =
    tokenOutBalanceRaw && tokenOut
      ? new BigNumber(tokenOutBalanceRaw)
          .shiftedBy(-tokenOut.decimals)
          .toFixed(6, BigNumber.ROUND_DOWN)
      : null;

  /* ---------- Wrap / Unwrap detection ---------- */
  const isWrap =
    tokenIn?.identifier === 'EGLD' && tokenOut?.identifier === wegld_identifier;
  const isUnwrap =
    tokenIn?.identifier === wegld_identifier && tokenOut?.identifier === 'EGLD';
  const isWrapUnwrap = isWrap || isUnwrap;


  const handleMax = () => {
    if (!tokenInBalanceRaw || !tokenIn) return;
    setAmountIn(
      new BigNumber(tokenInBalanceRaw)
        .shiftedBy(-tokenIn.decimals)
        .toFixed(tokenIn.decimals, BigNumber.ROUND_DOWN),
    );
  };

  /* ---------- Fetch token list + decimals from MX API ---------- */
  useEffect(() => {
    if (!swap_api) return;
    setTokensLoading(true);

    axios
      .get<{
        tokens: Array<{
          identifier: string;
          ticker: string;
          poolCount: number;
          logoUrl?: string | null;
        }>;
      }>(`${swap_api}/tokens`)
      .then(async (res) => {
        const raw = res.data.tokens;

        // Enrich each token with decimals from the MX API
        const enriched = await Promise.allSettled(
          raw.map(async (t) => {
            try {
              const { data } = await axios.get(`/tokens/${t.identifier}`, {
                baseURL: network.apiAddress,
              });
              return { ...t, decimals: (data.decimals as number) ?? 18 };
            } catch {
              return { ...t, decimals: 18 };
            }
          }),
        );

        const list = enriched
          .map((r) =>
            r.status === 'fulfilled'
              ? r.value
              : { identifier: '', ticker: '', poolCount: 0, decimals: 18 },
          )
          .filter((t) => t.identifier);

        // Use WEGLD's logo for native EGLD
        const wegld = list.find((t) => t.ticker === 'WEGLD');
        setTokens([{ ...EGLD_TOKEN, logoUrl: wegld?.logoUrl ?? null }, ...list]);
      })
      .catch(() => setTokens([EGLD_TOKEN]))
      .finally(() => setTokensLoading(false));

    axios.get(`${swap_api}/tokens/hub`).then((hubRes) => {
      const ids: string[] = (hubRes.data?.hubTokens ?? []).map((h: any) => h.identifier);
      setHubTokenIds(new Set(ids));
    }).catch(() => {});
  }, [network.apiAddress]);

  /* ---------- Init token selection from URL params ---------- */
  useEffect(() => {
    if (tokens.length === 0 || urlInitDoneRef.current) return;
    urlInitDoneRef.current = true;

    const fromId = searchParams.get('from');
    const toId = searchParams.get('to');

    if (fromId) {
      const found = tokens.find((t) => t.identifier === fromId);
      if (found) setTokenIn(found);
    }
    if (toId) {
      const found = tokens.find((t) => t.identifier === toId);
      if (found) setTokenOut(found);
    }
  }, [tokens]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- Sync token selection to URL ---------- */
  useEffect(() => {
    if (!urlInitDoneRef.current) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (tokenIn) next.set('from', tokenIn.identifier);
        else next.delete('from');
        if (tokenOut) next.set('to', tokenOut.identifier);
        else next.delete('to');
        return next;
      },
      { replace: true },
    );
  }, [tokenIn, tokenOut]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- Debounced quote ---------- */
  const fetchQuote = useCallback(async () => {
    // EGLD <> WEGLD : pas de quote, c'est un wrap/unwrap direct
    if (isWrapUnwrap) {
      setQuote(null);
      setQuoteError(null);
      return;
    }

    if (!tokenIn || !tokenOut || !amountIn || Number(amountIn) <= 0) {
      setQuote(null);
      setQuoteError(null);
      return;
    }

    const amountInRaw = new BigNumber(amountIn)
      .shiftedBy(tokenIn.decimals)
      .toFixed(0, BigNumber.ROUND_DOWN);

    setQuoteLoading(true);
    setQuoteError(null);

    try {
      const { data } = await axios.get<QuoteResponse>(`${swap_api}/quote`, {
        params: {
          tokenIn: tokenIn.identifier,
          tokenOut: tokenOut.identifier,
          amountIn: amountInRaw,
          slippageBps: Math.round(slippage * 10000),
        },
      });
      setQuote(data);
    } catch (err: any) {
      setQuoteError(
        err?.response?.data?.message ?? "Impossible d'obtenir un quote",
      );
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, [tokenIn, tokenOut, amountIn, slippage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    quoteTimerRef.current = setTimeout(fetchQuote, 300);
    return () => {
      if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    };
  }, [fetchQuote]);

  /* ---------- Invert direction ---------- */
  const invertTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn('');
    setQuote(null);
  };

  /* ---------- Execute swap ---------- */
  const handleSwap = async () => {
    if (!quote || !tokenIn || !address) return;
    setTxError(null);
    setIsSending(true);
    try {
      const { tx } = quote;
      const transaction = new Transaction({
        value: BigInt(tx.egldValue),
        data: new TextEncoder().encode(tx.txData),
        receiver: new Address(tx.scAddress),
        sender: new Address(address),
        gasLimit: BigInt(tx.gasLimit),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });
      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: 'Swap in progress…',
          errorMessage: 'Swap failed',
          successMessage: 'Swap successful!',
        },
      });
      setAmountIn('');
      setQuote(null);
    } catch (err: any) {
      setTxError(err?.message ?? 'Swap error');
    } finally {
      setIsSending(false);
    }
  };

  /* ---------- Derived display values ---------- */
  const amountOutDisplay = isWrapUnwrap
    ? amountIn || ''
    : quote
    ? new BigNumber(quote.amountOut)
        .shiftedBy(-(tokenOut?.decimals ?? 18))
        .toFixed(6, BigNumber.ROUND_DOWN)
    : '';

  const priceImpactPct = quote
    ? (parseFloat(quote.priceImpact) * 100).toFixed(2)
    : null;

  const impactColor = priceImpactPct
    ? parseFloat(priceImpactPct) < 1
      ? 'text-green-600 dark:text-green-400'
      : parseFloat(priceImpactPct) < 3
      ? 'text-[#BD37EC]'
      : 'text-red-600 dark:text-red-400'
    : '';

  const canSwap = isWrapUnwrap
    ? !!address && !isSending && !insufficientBalance && !!amountIn && Number(amountIn) > 0
    : !!quote && !!address && !isSending && !quoteLoading && !quoteError && !insufficientBalance;

  const isEgldOut = tokenOut?.identifier === 'EGLD';

  /* ---------- Execute wrap / unwrap ---------- */
  const handleWrapUnwrap = async () => {
    if (!tokenIn || !address || !amountIn || Number(amountIn) <= 0) return;
    setTxError(null);
    setIsSending(true);

    try {
      const senderAddress = new Address(address);
      const amountRaw = BigInt(
        new BigNumber(amountIn).shiftedBy(18).toFixed(0, BigNumber.ROUND_DOWN),
      );
      const wrapAddress = new Address(WRAP_CONTRACT);

      let txData: string;
      let receiver: Address;
      let value: bigint;

      if (isWrap) {
        receiver = wrapAddress;
        value = amountRaw;
        txData = 'wrapEgld';
      } else {
        // unwrap: ESDTTransfer to wrap contract
        receiver = senderAddress;
        value = BigInt(0);
        txData = [
          'MultiESDTNFTTransfer',
          wrapAddress.toHex(),
          '01',
          strToHex(wegld_identifier),
          '00',
          bigToHex(amountRaw),
          strToHex('unwrapEgld'),
        ].join('@');
      }

      const transaction = new Transaction({
        value,
        data: new TextEncoder().encode(txData),
        receiver,
        sender: senderAddress,
        gasLimit: BigInt(3_000_000),
        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        version: 1,
      });

      await signAndSendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: isWrap ? 'Wrapping…' : 'Unwrapping…',
          errorMessage: isWrap ? 'Wrap failed' : 'Unwrap failed',
          successMessage: isWrap ? 'Wrap successful!' : 'Unwrap successful!',
        },
      });

      setAmountIn('');
    } catch (err: any) {
      setTxError(err?.message ?? 'Error');
    } finally {
      setIsSending(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <PageTemplate
      title="Swap"
      subtitle='Swap your MultiversX tokens'
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Swap', path: '/swap' },
      ]}
      maxWidth="640px"
      helpLink='/guide#swap'
    >
      <div className="flex flex-col w-full gap-6">
        <Card
          className="border-2 border-cyan-500/20"
          title={
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔄</span>
                <span className="text-lg font-black tracking-tight">Swap</span>
              </div>
              {/* Tabs: Swap / Liquidité */}
              <div className="flex gap-1.5 p-1 bg-black/40 rounded-xl shadow-inner w-full xs:w-auto">
                <button className="flex-1 xs:flex-initial px-4 sm:px-6 py-2 text-sm font-black rounded-lg bg-purple-900/60 text-[#BD37EC] shadow-md transition-all">
                  Swap
                </button>
                <button
                  onClick={() => navigate(RouteNamesEnum.liquidity)}
                  className="flex-1 xs:flex-initial px-4 sm:px-6 py-2 text-sm font-bold rounded-lg text-white/40 hover:text-white transition-all hover:bg-white/10"
                >
                  Liquidity
                </button>
              </div>
            </div>
          }
          description="Swap your tokens using DinoVox liquidity pools"
        >
          <div className="space-y-2 mt-4">
            {/* ---- Token In ---- */}
            <div className="rounded-2xl border border-[#695885]/40 bg-black/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  You send
                </p>
                {address && tokenInBalanceDisplay && (
                  <button
                    onClick={handleMax}
                    className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#BD37EC] hover:text-purple-300 transition-colors"
                  >
                    <span className="text-white/40">Balance:</span>
                    {tokenInBalanceDisplay}
                    <span className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      MAX
                    </span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <TokenSelect
                  value={tokenIn}
                  onChange={(t) => {
                    setTokenIn(t);
                    setQuote(null);
                  }}
                  tokens={tokens}
                  exclude={tokenOut?.identifier}
                  loading={tokensLoading}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="0.0"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  className={`w-28 xs:w-36 flex-shrink-0 rounded-xl border bg-black/20 px-3 py-2.5 text-right text-sm font-semibold text-white focus:outline-none focus:ring-2 transition-colors ${
                    insufficientBalance
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#695885]/50 focus:ring-purple-500'
                  }`}
                />
              </div>
              {insufficientBalance && (
                <p className="mt-2 text-[10px] font-semibold text-red-500 text-right">
                  Insufficient balance
                </p>
              )}
            </div>

            {/* ---- Invert button ---- */}
            <div className="flex justify-center -my-0.5 relative z-10">
              <button
                onClick={invertTokens}
                className="rounded-full p-2 bg-black/40 border border-[#695885]/40 shadow-sm hover:bg-purple-900/30 transition-colors"
              >
                <ArrowUpDown className="h-4 w-4 text-[#BD37EC]" />
              </button>
            </div>

            {/* ---- Token Out ---- */}
            <div className="rounded-2xl border border-[#695885]/40 bg-black/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  You receive
                </p>
                <div className="flex items-center gap-2">
                  {quoteLoading && (
                    <span className="text-[10px] text-white/40 animate-pulse uppercase tracking-wider">
                      Calculating…
                    </span>
                  )}
                  {address && tokenOutBalanceDisplay && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Balance: <span className="text-[#BD37EC]">{tokenOutBalanceDisplay}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TokenSelect
                  value={tokenOut}
                  onChange={(t) => {
                    setTokenOut(t);
                    setQuote(null);
                  }}
                  tokens={tokens}
                  exclude={tokenIn?.identifier}
                  loading={tokensLoading}
                />
                <div className="w-28 xs:w-36 flex-shrink-0 rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-right text-sm font-semibold text-white select-none">
                  {amountOutDisplay || (
                    <span className="text-white/20">—</span>
                  )}
                </div>
              </div>
            </div>

            {/* ---- Wrap/Unwrap info ---- */}
            {isWrapUnwrap && !!amountIn && Number(amountIn) > 0 && (
              <div className="rounded-2xl border border-purple-500/30 bg-purple-900/20 px-4 py-3 text-sm text-purple-300">
                {isWrap ? '⚡ 1:1 conversion — EGLD → WEGLD via the wrap contract' : '⚡ 1:1 conversion — WEGLD → EGLD via the unwrap contract'}
              </div>
            )}

            {/* ---- Quote details ---- */}
            {!isWrapUnwrap && quote && !quoteLoading && (
              <div className="rounded-2xl border border-[#695885]/30 bg-black/30 px-4 py-3 space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Price impact</span>
                  <span className={`font-semibold ${impactColor}`}>
                    {priceImpactPct}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50">Hops</span>
                  <span className="font-medium text-white">{quote.hops}</span>
                </div>
                <div className="pt-2 border-t border-[#695885]/30">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-2">
                    Route
                  </p>
                  <div className="flex items-center flex-wrap gap-0">
                    {/* First token */}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-[#695885]/40 text-white">
                      {tokenIn?.ticker ?? quote.route[0]?.tokenIn}
                    </span>
                    {/* Wrap connector */}
                    {isEgldIn && (
                      <React.Fragment>
                        <div className="flex flex-col items-center mx-1">
                          <span className="text-[9px] font-bold text-white/40">wrap</span>
                          <div className="flex items-center gap-0.5">
                            <div className="h-px w-4 bg-[#695885]/60" />
                            <span className="text-[10px] leading-none text-white/40">▶</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-[#695885]/40 text-white">WEGLD</span>
                      </React.Fragment>
                    )}
                    {/* Hops */}
                    {quote.route.map((hop, i) => {
                      const ticker = tokens.find((t) => t.identifier === hop.tokenOut)?.ticker ?? hop.tokenOut.split('-')[0];
                      const hopImpact = hop.priceImpact ? parseFloat(hop.priceImpact) * 100 : 0;
                      const hopHighImpact = hopImpact >= 5;
                      const dexStyle =
                        hop.dexType === 'XExchange'
                          ? { line: 'bg-blue-500', label: 'text-blue-400', name: 'XExchange' }
                          : hop.dexType === 'JExchange'
                          ? { line: 'bg-green-500', label: 'text-green-400', name: 'JExchange' }
                          : { line: 'bg-[#BD37EC]', label: 'text-[#BD37EC]', name: 'DinoVox' };
                      return (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center mx-1">
                            <span className={`text-[9px] font-bold ${hopHighImpact ? 'text-red-400' : dexStyle.label}`}>
                              {dexStyle.name}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <div className={`h-px w-4 ${hopHighImpact ? 'bg-red-500' : dexStyle.line}`} />
                              <span className={`text-[10px] leading-none ${hopHighImpact ? 'text-red-400' : dexStyle.label}`}>
                                {hopHighImpact ? '⚠' : '▶'}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-[#695885]/40 text-white">
                            {ticker}
                          </span>
                        </React.Fragment>
                      );
                    })}
                    {/* Unwrap connector */}
                    {isEgldOut && (
                      <React.Fragment>
                        <div className="flex flex-col items-center mx-1">
                          <span className="text-[9px] font-bold text-white/40">unwrap</span>
                          <div className="flex items-center gap-0.5">
                            <div className="h-px w-4 bg-[#695885]/60" />
                            <span className="text-[10px] leading-none text-white/40">▶</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-[#695885]/40 text-white">EGLD</span>
                      </React.Fragment>
                    )}
                  </div>
                  {(() => {
                    const highImpactHops = quote.route.filter((h) => h.priceImpact && parseFloat(h.priceImpact) * 100 >= 5);
                    if (highImpactHops.length === 0) return null;
                    const firstDinoHop = highImpactHops.find((h) => h.dexType === 'DinoVox' || !h.dexType);
                    return (
                      <div className="mt-2 flex flex-col gap-2 rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2 text-xs text-red-400">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0">⚠</span>
                          <span>This route has a high price impact — you are paying more than the market price for this token. Try reducing the amount for a better rate.</span>
                        </div>
                        {firstDinoHop && (() => {
                          const a = firstDinoHop.tokenIn;
                          const b = firstDinoHop.tokenOut;
                          const [tokenA, tokenB] = hubTokenIds.has(b) && !hubTokenIds.has(a) ? [b, a] : [a, b];
                          return (
                            <button
                              onClick={() => navigate(`${RouteNamesEnum.addLiquidity}?tokenA=${tokenA}&tokenB=${tokenB}`)}
                              className="self-start underline font-semibold hover:text-red-300 transition"
                            >
                              Add liquidity on this pair →
                            </button>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
                <div className="pt-2 border-t border-[#695885]/30 flex items-center justify-between">
                  <span className="text-white/50">Slippage</span>
                  <div className="flex gap-1">
                    {SLIPPAGE_PRESETS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlippage(s)}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                          slippage === s
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-white/50 hover:bg-purple-900/30'
                        }`}
                      >
                        {(s * 100).toFixed(1)}%
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-[#695885]/30 flex items-center justify-between">
                  <span className="text-white/50">Minimum received</span>
                  <span className="font-semibold text-white">
                    {new BigNumber(applySlippage(quote.amountOut, slippage).toString())
                      .shiftedBy(-(tokenOut?.decimals ?? 18))
                      .toFixed(6, BigNumber.ROUND_DOWN)}{' '}
                    <span className="text-white/40 text-xs">{tokenOut?.ticker}</span>
                  </span>
                </div>
              </div>
            )}

            {/* ---- Errors ---- */}
            {(!isWrapUnwrap && quoteError || txError) && (
              <div className="rounded-xl bg-red-900/20 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                {quoteError ?? txError}
              </div>
            )}

            {/* ---- Swap button ---- */}
            <button
              onClick={isWrapUnwrap ? handleWrapUnwrap : handleSwap}
              disabled={!canSwap}
              className="dinoButton w-full !py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {!address
                ? 'Connect your wallet'
                : isSending
                ? 'Signing…'
                : !tokenIn || !tokenOut
                ? 'Select tokens'
                : !amountIn || Number(amountIn) <= 0
                ? 'Enter an amount'
                : insufficientBalance
                ? 'Insufficient balance'
                : quoteLoading
                ? 'Calculating…'
                : isWrapUnwrap
                ? isWrap ? 'Wrap' : 'Unwrap'
                : quoteError
                ? 'Quote unavailable'
                : 'Swap'}
            </button>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
