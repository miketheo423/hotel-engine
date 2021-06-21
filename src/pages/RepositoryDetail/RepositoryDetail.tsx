import { useParams } from 'react-router';
import { useQuery } from 'react-query';

import { getRepo } from '../../api/RepoAPI';
import { Repository } from '../../utils/models/Repository';

interface RepositoryRouteParams {
  owner: string;
  repo: string;
}

const RepositoryDetail = () => {
  const { owner, repo } = useParams<RepositoryRouteParams>();
  const { data, isLoading, isError } = useQuery<Repository, Error>([owner, repo], () =>
    getRepo(owner, repo)
  );

  return <main>Repository Detail</main>;
};

export default RepositoryDetail;
