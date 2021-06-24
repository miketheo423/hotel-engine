import { rest } from 'msw';

const RepoHandlers = [
  rest.get('https://api.github.com/search/repositories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ items: [], total_count: 0 }));
  }),
];

export default RepoHandlers;
