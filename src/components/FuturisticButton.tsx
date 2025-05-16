
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
          bg-iraq-green-dark text-iraq-gray hover:bg-iraq-green hover:text-black 
          border border-iraq-green shadow-[0_0_10px_rgba(0,255,102,0.3)]
          hover:shadow-[0_0_15px_rgba(0,255,102,0.5)]
          before:content-[''] before:absolute before:top-0 before:left-0 
          before:w-full before:h-full before:bg-iraq-green before:opacity-0
          before:transition-opacity hover:before:opacity-100 
          before:z-0
        `,
        variant === 'outline' && `
          bg-transparent text-iraq-green border border-iraq-green 
          hover:text-iraq-green-light hover:border-iraq-green-light
          shadow-[0_0_10px_rgba(0,255,102,0.2)] hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]
        `,
        variant === 'ghost' && `
          bg-transparent text-iraq-green hover:bg-iraq-green-dark 
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
