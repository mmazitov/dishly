import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					`flex 
						w-full
						rounded-[10px] 
						border 
						border-[var(--input-border)]
						bg-[var(--input)] 
						placeholder:text-[var(--input-text)] 
						p-[12px] 
						text-base 
						transition-colors 
						hover:border-[var(--input-border-hover)]
						hover:bg-[var(--input-hover)] 
						text-[var(--input-text-hover)] 
						focus:border-[var(--input-border-hover)]
						focus:bg-[var(--input-hover)] 
						focus-visible:outline-none 
						focus-visible:ring-0 
						focus-visible:ring-ring 
						disabled:cursor-not-allowed 
						disabled:opacity-50 
						md:text-sm 
						focus-visible:shadow-none`,
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
