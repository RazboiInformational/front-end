import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '600', '800'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Război Informațional',
	description:
		'Federația Rusă dorește să preia puterea politică în România folosind TikTok și transformând civilii în niște soldați, fără voia lor. Noi dorim să protejăm integritatea României.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'dark bg-background text-foreground antialiased'
				)}
			>
				{children}
			</body>
		</html>
	);
}
