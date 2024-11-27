import Link from 'next/link';
import {CustomLink} from './link';

import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getLinks } from './getLinks';

type Args = {
	page: string;
};

export default async function HomePage({ page }: Args) {
	const intPage = parseInt(page);

	if (intPage < 1) {
		notFound();
	}

	const links = await getLinks(intPage);

	if (intPage > links.totalPages) {
		notFound();
	}

	return (
		<div className='mb-20'>
			<div className='px-4 sm:px-6 md:px-8'>
				<div className='relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
					<h1 className='text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight md:text-center dark:text-white'>
						Război Informațional cu Federația Rusă
					</h1>
					<p className='text-lg md:text-center md:mx-auto w-full max-w-[600px] leading-7 [&:not(:first-child)]:mt-6'>
						Mai jos găseşti videoclipuri de pe TikTok care îl susţin
						pe Călin Georgescu sau Partidul Oamenilor Tineri (POT).
						Poți să ne ajuți prin folosirea Report sau prin
						comentarii care îl demaschează.
					</p>
					<div className='mt-8 flex gap-4 items-center md:justify-center'>
						<Link href='/trimite'>
							<Button>Trimite un URL de pe TikTok</Button>
						</Link>
						<Button variant='secondary'>Cum pot raporta?</Button>
					</div>
				</div>
			</div>
			<div className='mx-auto w-full max-w-[800px] mt-20'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>URL</TableHead>
							<TableHead className='text-right'>
								Creat pe
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{(links.docs || []).map((doc) => (
							<TableRow key={doc.id}>
								<TableHead>
									<CustomLink doc={doc} />
								</TableHead>
								<TableHead className='text-right'>
									{new Date(doc.createdAt).toLocaleString()}
								</TableHead>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{links.totalPages > 1 && (
				<div className='mt-8'>
					<PaginationWithLinks
						page={links.page || 1}
						pageSize={links.limit || 10}
						totalCount={links.totalDocs || 0}
					/>
				</div>
			)}
		</div>
	);
}
