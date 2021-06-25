import { rest } from 'msw';
import { mockRepositories } from './../utils/mocks/mockRepositories';

const RepoHandlers = [
  rest.get('https://api.github.com/search/repositories', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ items: mockRepositories, total_count: mockRepositories.length })
    );
  }),
];

export default RepoHandlers;
