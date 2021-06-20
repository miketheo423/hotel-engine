export interface SearchOptions {
  page: number;
  per_page?: number;
  sort: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order: 'asc' | 'desc';
}

export const search = (query: string, options: SearchOptions) => {
  const { page } = options;
  return fetch(`https://api.github.com/search/repositories?q=${query}&page=${page}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getRepo = (owner: string, repo: string) => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });
};
