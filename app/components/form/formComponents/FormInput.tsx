'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import FormError from './FormError';

interface FormInputProps {
	label: string;
	id: string;
	type: string;
	errorMessage?: string;
}
const FormInput: React.FC<FormInputProps> = ({ label, id, type }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const errorMessage = errors[id]?.message?.toString();
	const labelCapitalized = label[0].toUpperCase() + label.slice(1);
	const labelLoverCased = label.toLowerCase();
	return (
		<div className="relative gap-2 grid">
			<Label htmlFor={id}>{labelCapitalized}</Label>
			<Input
				{...register(id)}
				type={type}
				id={id}
				placeholder={`Your ${labelLoverCased}...`}
				required
			/>
			{errorMessage && <FormError message={errorMessage} />}
		</div>
	);
};

export default FormInput;
