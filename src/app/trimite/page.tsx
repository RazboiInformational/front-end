import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import TrimiteForm from './TrimitereForm';

export const metadata: Metadata = {
	title: 'Trimite un URL de pe TikTok',
};

export default function TrimitePage() {
	return (
		<>
			<div className='px-4 sm:px-6 md:px-8'>
				<div className='relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
					<h1 className='text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight md:text-center dark:text-white'>
						Trimite un URL de pe TikTok
					</h1>
					<TrimiteForm />
				</div>
			</div>
			<Toaster theme='dark' position='bottom-center' richColors />
		</>
	);
}
