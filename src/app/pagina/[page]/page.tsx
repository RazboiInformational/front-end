import HomePage from '@/components/pages/home';
import { getTotalLinks } from '@/components/pages/home/getTotalLinks';

type Args = {
	params: Promise<{
		page: string;
	}>;
};

export async function generateStaticParams() {
	const { totalDocs } = await getTotalLinks();

	return Array.from({ length: totalDocs }, (_, i) => i + 1).map((page) => ({
		page: page.toString(),
	}));
}

export default async function Home({ params }: Args) {
	const { page } = await params;
	return <HomePage page={page} />;
}
