import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface WithClassnameType {
  className?: string;
  'data-testid'?: string;
}

interface CardType extends PropsWithChildren, WithClassnameType {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  reference?: string;
  onClick?: () => void;
}

export const Card = (props: CardType) => {
  const { id, title, children, description, className, onClick } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      className={classNames('ms-card flex flex-col p-5 transition-all', className)}
    >
      {title && (
        <div className='flex items-start justify-between gap-3'>
          <div className='text-white font-black tracking-tight uppercase w-full'>
            {title}
          </div>
        </div>
      )}

      {description && (
        <p className='mt-1.5 text-sm leading-relaxed text-white/50 font-medium'>
          {description}
        </p>
      )}

      {(title || description) && children && (
        <div className='my-4 h-px bg-white/10' />
      )}

      {children}
    </div>
  );
};
