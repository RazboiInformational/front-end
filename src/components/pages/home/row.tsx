"use client";
import { TableRow, TableHead } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

interface Props {
  doc: {
    id: number;
    url: string;
    createdAt: string;
  };
}

export const Row = (props: Props) => {
  const [visitedIds, setVisitedIds] = useState<number[]>([]);
  const { doc } = props;

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== "undefined") {
      localStorage.getItem("visitedIds");
      setVisitedIds(JSON.parse(localStorage.getItem("visitedIds") || "[]"));
    }
  }, []);

  const setVisitedId = (id: number) => {
    if (typeof window !== "undefined") {
      const visitedIds = JSON.parse(localStorage.getItem("visitedIds") || "[]");
      if (visitedIds.includes(id)) return;

      visitedIds.push(id);
      localStorage.setItem("visitedIds", JSON.stringify(visitedIds));
      setVisitedIds(visitedIds);
    }
  };
  return (
    <TableRow key={doc.id}>
      <TableHead>
        <a
          onClick={() => setVisitedId(doc.id)}
          href={doc.url}
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          {doc.url}
        </a>
      </TableHead>
      <TableHead className="text-right">
        {new Date(doc.createdAt).toLocaleString()}
      </TableHead>
      <TableHead className="text-right">
        {visitedIds.includes(doc.id) ? (
          <span>&#9989;</span>
        ) : (
          <span>🔴</span>
        )}
      </TableHead>
    </TableRow>
  );
};
