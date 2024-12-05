'use client';

import { Button } from '@/components/ui/button';
interface FormButtonProps {
	value: string;
}

const FormButton: React.FC<FormButtonProps> = ({ value }) => {
	return (
		<Button type="submit" className="w-full">
			{value}
		</Button>
	);
};

export default FormButton;
