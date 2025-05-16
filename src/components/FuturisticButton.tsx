
import React from 'react';
import { cn } from '@/lib/utils';

interface FuturisticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'relative overflow-hidden transition-all duration-300 font-medium tracking-wide',
        'active:scale-95 focus:outline-none',
        
        // Size variants
        size === 'sm' && 'text-sm px-4 py-1.5 rounded-md',
        size === 'md' && 'text-base px-6 py-2.5 rounded-md',
        size === 'lg' && 'text-lg px-8 py-3 rounded-md',
        
        // Style variants
        variant === 'default' && `
          bg-iraq-green text-black hover:bg-opacity-90
          border border-transparent shadow-[0_0_10px_rgba(0,255,102,0.5)]
          hover:shadow-[0_0_15px_rgba(0,255,102,0.8)]
          before:content-[''] before:absolute before:top-0 before:left-0 
          before:w-full before:h-full before:bg-white before:opacity-0
          before:transition-opacity hover:before:opacity-10 
          before:z-0 font-bold
        `,
        variant === 'outline' && `
          bg-transparent text-iraq-green border border-iraq-green 
          hover:border-iraq-green-light hover:text-white
          shadow-[0_0_10px_rgba(0,255,102,0.2)] hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]
        `,
        variant === 'ghost' && `
          bg-transparent text-iraq-green hover:bg-iraq-green-dark/20
          hover:text-iraq-green-light hover:shadow-[0_0_10px_rgba(0,255,102,0.3)]
        `,
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default FuturisticButton;
