'use client';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

import { MdError } from 'react-icons/md';

interface FormErrorProps {
	message?: string; // Make `message` optional
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
	return (
		<div className="flex items-center gap-1 text-red-500">
			<div className="top-8 right-2 absolute">
				<HoverCard>
					<HoverCardTrigger className="cursor-pointer">
						<MdError />
					</HoverCardTrigger>
					<HoverCardContent className="px-3 p-2 w-auto">
						<p className="mt-[4px] text-[13px] text-red-500">{message}</p>
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
};

export default FormError;
