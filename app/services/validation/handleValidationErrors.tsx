import { FieldErrors } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

export const handleValidationErrors = (errors: FieldErrors) => {
	Object.entries(errors).forEach(([field, error]) => {
		toast({
			title: 'Validation Error',
			description: error?.message?.toString(),
			variant: 'destructive',
		});
		console.error(`Validation error in ${field}:`, error?.message);
	});
};
