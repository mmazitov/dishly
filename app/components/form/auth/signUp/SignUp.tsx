//sigUn.tsx
'use client';

import { FormProvider, useForm } from 'react-hook-form';

import FormButton from '@/app/components/form/formComponents/FormButton';
import FormInput from '@/app/components/form/formComponents/FormInput';
import { signUpSchema } from '@/app/lib/validateSchema';
import { handleSignUp } from '@/app/services/auth/handleSubmit';
import { handleValidationErrors } from '@/app/services/handleValidationErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const methods = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});
	const onSubmit = async (data: SignUpFormData) => {
		await handleSignUp(data);
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
					label="Name"
					id="name"
					type="text"
					errorMessage="Name required"
				/>
				<FormInput
					label="Email"
					id="email"
					type="email"
					errorMessage="Email required"
				/>
				<FormInput
					label="Password"
					id="password"
					type="password"
					errorMessage="Password required"
				/>
				<FormInput
					label="Confirm Password"
					id="confirmPassword"
					type="password"
					errorMessage="Password must match"
				/>
				<FormButton value="Create account" />
			</form>
		</FormProvider>
	);
};

export default SignUp;
