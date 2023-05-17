import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface HeadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xlg';
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

function Heading({ size = 'md', asChild, children, className }: HeadingProps) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      className={clsx(
        'text-gray-100 font-sans font-bold',
        {
          'text-lg': size ===  'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
          'text-3xl': size === 'xlg',
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export default Heading;
