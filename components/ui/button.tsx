import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex justify-center items-center gap-2 disabled:opacity-50 p-[12px] rounded-[20px] focus-visible:ring-0 focus-visible:ring-ring font-medium text-sm whitespace-nowrap transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 focus-visible:outline-none',
	{
		variants: {
			variant: {
				default: `
					border border-[var(--default-border)]
					bg-[var(--default)]
					text-[var(--default-color)]
					hover:border-[var(--default-border-hover)]
					hover:bg-[var(--default-hover)]
					hover:text-[var(--default-color-hover)]
				`,
				destructive: `
					border border-[var(--destructive-border)] 
					bg-[var(--destructive)] 
					text-[var(--destructive-color)]
					hover:border-[var(--destructive-border-hover)]
					hover:bg-[var(--destructive-hover)]
					hover:text-[var(--destructive-color-hover)]
					focus-visible:border-[var(--destructive-border-hover)]
					focus-visible:bg-[var(--destructive-hover)]
					focus-visible:text-[var(--destructive-color-hover)]
				`,
				outline: `
					border border-[var(--outline-border)] 
					bg-[var(--outline)] 
					text-[var(--outline-color)]
					hover:border-[var(--outline-border-hover)]
					hover:bg-[var(--outline-hover)]
					hover:text-[var(--outline-color-hover)]
					focus-visible:border-[var(--outline-border-hover)]
					focus-visible:bg-[var(--outline-hover)]
					focus-visible:text-[var(--outline-color-hover)]
				`,
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-[var(--link)] underline-offset-4 hover:underline p-0',
				disable: 'bg-red text-muted-foreground shadow-sm cursor-not-allowed',
			},
			size: {
				default: 'h-9',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants, VariantProps };
