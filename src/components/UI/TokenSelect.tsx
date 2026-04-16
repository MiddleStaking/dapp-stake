import { useEffect, useRef, useState } from 'react';

export interface TokenSelectToken {
  identifier: string;
  ticker: string;
  logoUrl?: string | null;
}

interface TokenSelectProps<T extends TokenSelectToken> {
  value: T | null;
  onChange: (t: T | null) => void;
  tokens: T[];
  exclude?: string;
  loading: boolean;
  className?: string;
}

function TokenLogo({ url, ticker }: { url?: string | null; ticker: string }) {
  const [error, setError] = useState(false);
  if (!url || error) {
    return (
      <span className='w-6 h-6 rounded-full bg-purple-900/60 border border-[#695885]/60 flex items-center justify-center text-[9px] font-bold text-purple-300 shrink-0'>
        {ticker.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={url}
      alt={ticker}
      className='w-6 h-6 rounded-full object-contain shrink-0'
      onError={() => setError(true)}
    />
  );
}

export function TokenSelect<T extends TokenSelectToken>({
  value,
  onChange,
  tokens,
  exclude,
  loading,
  className = '',
}: TokenSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = tokens
    .filter((t) => t.identifier !== exclude)
    .filter((t) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return t.ticker.toLowerCase().includes(q) || t.identifier.toLowerCase().includes(q);
    });

  useEffect(() => {
    if (!open) { setSearch(''); return; }
    setTimeout(() => searchRef.current?.focus(), 50);
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className={`relative flex-1 ${className}`}>
      <button
        type='button'
        disabled={loading}
        onClick={() => setOpen((o) => !o)}
        className='w-full flex items-center gap-2 rounded-xl border border-[#695885]/50 bg-black/20 px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50'
      >
        {loading ? (
          <span className='flex-1 text-left text-white/40'>Loading…</span>
        ) : value ? (
          <>
            <TokenLogo url={value.logoUrl} ticker={value.ticker} />
            <span className='flex-1 text-left'>{value.ticker}</span>
          </>
        ) : (
          <span className='flex-1 text-left text-white/40'>Select a token</span>
        )}
        <svg
          className={`w-4 h-4 text-white/40 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {open && (
        <div className='absolute z-50 mt-1 w-full rounded-xl border border-[#695885]/50 bg-[#0e0a1a] shadow-xl shadow-black/50 overflow-hidden'>
          <div className='px-2 pt-2 pb-1'>
            <input
              ref={searchRef}
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search…'
              className='w-full rounded-lg border border-[#695885]/40 bg-black/30 px-3 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          <div className='max-h-52 overflow-y-auto'>
            {filtered.length === 0 ? (
              <p className='px-3 py-3 text-sm text-white/30 text-center'>No results</p>
            ) : (
              filtered.map((t) => (
                <button
                  key={t.identifier}
                  type='button'
                  onClick={() => { onChange(t); setOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium hover:bg-purple-900/20 transition-colors ${
                    value?.identifier === t.identifier
                      ? 'bg-purple-900/30 text-[#BD37EC]'
                      : 'text-white'
                  }`}
                >
                  <TokenLogo url={t.logoUrl} ticker={t.ticker} />
                  <span className='flex-1 text-left'>{t.ticker}</span>
                  <span className='text-[10px] text-white/30 font-normal'>{t.identifier.split('-')[1] ?? ''}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
