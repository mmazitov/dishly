'use client';

import {
	Button,
	buttonVariants,
	type VariantProps,
} from '@/components/ui/button';

interface FormButtonProps extends VariantProps<typeof buttonVariants> {
	value: string;
}

const FormButton: React.FC<FormButtonProps> = ({ value, variant }) => {
	return (
		<Button type="submit" variant={variant} className="w-full">
			{value}
		</Button>
	);
};

export default FormButton;
