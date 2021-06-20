export interface SearchOptions {
  page: number;
  per_page?: number;
  sort: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order: 'asc' | 'desc';
}

export const search = (query: string, options: SearchOptions) => {
  const { page } = options;
  return fetch(`https://api.github.com/search/repositories?q=${query}&page=${page}`);
};
