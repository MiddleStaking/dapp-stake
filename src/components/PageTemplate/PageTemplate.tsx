import React from 'react';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
  showTitle?: boolean;
  className?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  children,
  maxWidth = '1400px',
  showTitle = true,
  className = ''
}) => {
  return (
    <div className={`w-full px-4 pt-4 pb-6 ${className}`}>
      {showTitle && title && (
        <div className='mb-5 flex flex-col items-center'>
          <div className='font-sans font-black text-white text-xl uppercase tracking-wider text-center'>
            {title}
          </div>
          {subtitle && (
            <div className='flex flex-col items-center mt-1'>
              <p className='text-[10px] font-bold text-white/50 uppercase tracking-[0.15em] text-center max-w-[280px] leading-tight'>
                {subtitle}
              </p>
              <div className='w-12 h-[1.5px] mt-2' style={{ background: 'linear-gradient(to right, transparent, #BD37EC, transparent)' }} />
            </div>
          )}
        </div>
      )}
      <div style={{ maxWidth, marginLeft: 'auto', marginRight: 'auto' }}>
        {children}
      </div>
    </div>
  );
};
