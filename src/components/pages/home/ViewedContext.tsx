'use client';

import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';

type Args = {
	children: React.ReactNode;
};

export default function ViewedProvider({ children }: Args) {
	const [viewed, setViewed] = useState<number[]>([]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const json = localStorage.getItem('viewed');
			const arr = JSON.parse(json || '[]');
			setViewed(arr);
		}
	}, []);

	useEffect(() => {
		const json = JSON.stringify(viewed);
		localStorage.setItem('viewed', json);
	}, [viewed]);

	return (
		<ViewedContext.Provider value={[viewed, setViewed]}>
			{children}
		</ViewedContext.Provider>
	);
}

const ViewedContext = createContext<
	[number[], Dispatch<SetStateAction<number[]>>]
>([[], () => {}]);

export const useViewed = () => useContext(ViewedContext);
