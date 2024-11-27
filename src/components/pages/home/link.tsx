"use client"
import React, { useEffect, useState } from 'react'

interface Props {
	doc: {
		id: number;
		url: string;
	}
}

export const CustomLink = (props: Props) => {
	const [visitedIds, setVisitedIds] = useState<number[]>([]);
	const {doc} = props;

	  useEffect(() => {
		// Ensure this code only runs in the browser
		if (typeof window !== "undefined") {
		  localStorage.getItem('visitedIds'); 
		  setVisitedIds(JSON.parse(localStorage.getItem('visitedIds') || '[]'));
		}
	  }, []);

	  const setVisitedId = (id: number) => {
		if (typeof window !== "undefined") {
			const visitedIds = JSON.parse(localStorage.getItem('visitedIds') || '[]');
			if(visitedIds.includes(id)) return;

			visitedIds.push(id);
			localStorage.setItem('visitedIds', JSON.stringify(visitedIds));
			setVisitedIds(visitedIds);
		}
	}
  return (
									<>
	<a
										onClick={() => setVisitedId(doc.id)}
										href={doc.url}
										target='_blank'
										rel='noopener nofollow noreferrer'
									>
										{doc.url} 
									</a>
									{visitedIds.includes(doc.id) && <span> &#9989;</span>}
									</>
  )
}
