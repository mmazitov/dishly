'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { authSchema } from '@/app/lib/validateSchema';
import { handleSignIn } from '@/app/services/auth/handleSubmit';
import { handleValidationErrors } from '@/app/services/handleValidationErrors';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from '@/app/components/form/formComponents/FormInput';
import FormButton from '@/app/components/form/formComponents/FormButton';

type AuthFormData = z.infer<typeof authSchema>;
const SignIn = () => {
	const methods = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });
	const { toast } = useToast();

	const onSubmit = async (data: AuthFormData) => {
		await handleSignIn(data);
	};

	const handleErrorToast = () => {
		handleValidationErrors(methods.formState.errors);
	};

	return (
		<FormProvider {...methods}>
			<form
				className="gap-5 grid mt-3"
				onSubmit={methods.handleSubmit(onSubmit, handleErrorToast)}
			>
				<FormInput
					label="email"
					id="email"
					type="email"
					errorMessage="Email required"
				/>
				<FormInput
					label="password"
					id="password"
					type="password"
					errorMessage="Password required"
				/>
				<FormButton value="Sign in" />
			</form>
		</FormProvider>
	);
};

export default SignIn;
