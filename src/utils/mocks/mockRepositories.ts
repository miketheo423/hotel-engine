import { Repository } from './../models/Repository';

export const mockRepo: Repository = {
  id: 207645083,
  name: 'react-query',
  full_name: 'tannerlinsley/react-query',
  owner: {
    login: 'tannerlinsley',
    avatar_url: 'https://avatars.githubusercontent.com/u/5580297?v=4',
  },
  html_url: 'https://github.com/tannerlinsley/react-query',
  description: '⚛️ Hooks for fetching, caching and updating asynchronous data in React',
  stargazers_count: 20861,
  language: 'TypeScript',
  open_issues_count: 34,
  forks_count: 985,
  subscribers_count: 156,
};

export const mockRepositories = Array(40)
  .fill(mockRepo)
  .map((repo, i) => ({ ...repo, id: i }));
