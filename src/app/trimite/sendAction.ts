'use server';

import type { IData } from './types';

export async function send(data: IData, token: string) {
	try {
		if (!process.env.API_BASE || !process.env.API_KEY) {
			throw new Error('Ceva a mers greșit');
		}

		const url = new URL('/api/links', process.env.API_BASE);
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json',
				'x-api-key': process.env.API_KEY,
				'x-recaptcha-v3': token,
			},
		});

		if (res.status === 201) {
			return;
		} else if (res.status === 400) {
			return {
				errors: {
					unique: true,
				},
			};
		} else {
			throw new Error();
		}
	} catch (err) {
		throw new Error('Ceva a mers greșit');
	}
}
