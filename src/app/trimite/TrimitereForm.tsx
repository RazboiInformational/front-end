'use client';

import { Loader2 } from 'lucide-react';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getToken } from './recaptcha';
import { send } from './sendAction';
import type { IData } from './types';

export default function TrimiteForm() {
	const form = useForm<IData>({
		mode: 'onTouched',
		defaultValues: {
			url: '',
		},
	});

	const {
		formState: { errors, isSubmitting },
		reset,
	} = form;

	const onSubmit = async (data: IData) => {
		try {
			const token = await getToken('trimite');
			const res = await send(data, token);

			reset();

			if (res?.errors) {
				if (res.errors.unique) {
					toast.error('Acest URL există deja.');
				}

				return;
			}

			toast.success(
				'România îți mulțumește! După ce este aprobat, o să fie vizibil pe prima pagină.'
			);
		} catch (err) {
			toast.error((err as Error).message);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='md:mx-auto flex flex-col sm:flex-row w-full max-w-[600px] items-center gap-4 sm:gap-2 mt-6 md:mt-12'
				>
					<FormField
						control={form.control}
						name='url'
						rules={{
							required: 'Trebuie să introduci un URL.',
							pattern: {
								value: /^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/,
								message:
									'Trebuie să fie un URL de la platforma TikTok.',
							},
						}}
						render={({ field }) => (
							<Input
								type='text'
								placeholder='https://www.tiktok.com/...'
								disabled={isSubmitting}
								{...field}
							/>
						)}
					/>
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full sm:w-[80px]'
					>
						{isSubmitting ? (
							<Loader2 className='animate-spin' />
						) : (
							'Trimite'
						)}
					</Button>
				</form>

				{errors.url?.message && (
					<p className='max-w-[600px] mx-auto mt-2 text-sm text-error'>
						{errors.url?.message}
					</p>
				)}
			</Form>
			<Script
				id='grecaptcha'
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
			/>
		</>
	);
}
