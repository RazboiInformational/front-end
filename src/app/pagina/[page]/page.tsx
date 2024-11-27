import HomePage from '@/components/pages/home';
import { getTotalLinks } from '@/components/pages/home/getTotalLinks';

type Args = {
	params: Promise<{
		page: string;
	}>;
};

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
	const { totalDocs } = await getTotalLinks();
	const totalPages = Math.ceil(totalDocs / 10);

	return Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(
		(page) => ({
			page: page.toString(),
		})
	);
}

export default async function Home({ params }: Args) {
	const { page } = await params;
	return <HomePage page={page} />;
}
