export interface ILink {
	id: number;
	url: string;
	approved: boolean;
	updatedAt: string;
	createdAt: string;
}

export type PaginatedDocs<T = any> = {
	docs: T[];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage?: null | number | undefined;
	page?: number;
	pagingCounter: number;
	prevPage?: null | number | undefined;
	totalDocs: number;
	totalPages: number;
};
