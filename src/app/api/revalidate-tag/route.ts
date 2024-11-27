import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export async function POST(request: Request) {
	const headersList = await headers();
	const key = headersList.get('x-api-key');

	if (key !== process.env.API_KEY) {
		return new Response(null, { status: 403 });
	}

	const data = await request.json();
	const tag = data['tag'];

	if (!tag || typeof tag !== 'string') {
		return new Response(null, { status: 400 });
	}

	console.log(`[DEBUG]: Revalidate tag ${tag}`);
	revalidateTag(tag);

	return new Response(null, { status: 200 });
}
