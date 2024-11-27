import qs from 'qs';

type Response = {
	totalDocs: number;
};

export const getTotalLinks = async () => {
	try {
		const url = new URL('/api/links/count', process.env.API_BASE);

		const query = qs.stringify(
			{
				where: {
					approved: {
						equals: true,
					},
				},
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
