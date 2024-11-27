'use client';

import { TableHead, TableRow } from '@/components/ui/table';
import type { ILink } from '@/lib/types';
import { useViewed } from './ViewedContext';

type Args = {
	doc: ILink;
};

export default function Entry({ doc }: Args) {
	const [viewed, setViewed] = useViewed();

	const showCheck = viewed.includes(doc.id);

	const addToViewed = () => {
		setViewed([...viewed, doc.id]);
	};

	return (
		<TableRow key={doc.id}>
			<TableHead>
				<a
					href={doc.url}
					target='_blank'
					rel='noopener nofollow noreferrer'
					onClick={() => addToViewed()}
				>
					{doc.url}
				</a>
			</TableHead>
			<TableHead className='text-right'>
                {new Date(doc.createdAt).toLocaleString('ro')}
            </TableHead>
			<TableHead className='text-right w-[52px]'>
				{showCheck && <span>&#9989;</span>}
			</TableHead>
		</TableRow>
	);
}
