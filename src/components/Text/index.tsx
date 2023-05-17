import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

interface TextProps {
  size?: 'sm' | 'md' | 'lg' | 'xlg';
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

function Text({ size = 'md', asChild, children, className }: TextProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={clsx(
        'text-gray-100 font-sans',
        {
          'text-xs': size ===  'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg',
          'text-lg': size === 'xlg',
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export default Text;
