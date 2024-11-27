import qs from 'qs';

import type { ILink, PaginatedDocs } from '@/lib/types';

type Response = PaginatedDocs<ILink>;

export const getLinks = async (page: number) => {
	try {
		const url = new URL('/api/links', process.env.API_BASE);

		const query = qs.stringify(
			{
				where: {
					approved: {
						equals: true,
					},
				},
				sort: '-createdAt',
				depth: 0,
				limit: 25,
				page,
			},
			{ addQueryPrefix: true }
		);

		const res = await fetch(`${url}${query}`, {
			cache: 'force-cache',
			next: {
				tags: ['links'],
			},
			headers: {
				'x-api-key': process.env.API_KEY || '',
			},
		});

		const json = await res.json();

		return json as Response;
	} catch (err) {
		console.error(err);
		throw new Error('Ceva a mers greșit');
	}
};
