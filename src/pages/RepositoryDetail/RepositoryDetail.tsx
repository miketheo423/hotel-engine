import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getRepo } from '../../api/RepoAPI';

import { Icon, Loader, Popup } from 'semantic-ui-react';
import { Count } from '../../components';

import { Repository } from '../../utils/models/Repository';

import './RepositoryDetail.scss';

interface RepositoryRouteParams {
  owner: string;
  repo: string;
}

const RepositoryDetail = () => {
  const { owner: ownerParam, repo } = useParams<RepositoryRouteParams>();
  const { data, isLoading, error } = useQuery<Repository, Error>([ownerParam, repo], () =>
    getRepo(ownerParam, repo)
  );

  if (isLoading) {
    return <Loader active={isLoading} />;
  }

  const {
    name,
    description,
    owner,
    html_url,
    stargazers_count = 0,
    subscribers_count = 0,
    forks_count = 0,
    open_issues_count = 0,
  } = data || {};

  const { avatar_url, login } = owner || {};

  return (
    <main className='repo'>
      {error && <p>{error.message}</p>}
      {data && (
        <article className='ui padded segment'>
          <header>
            <div className='repo__title-container'>
              <h1 className='repo__title'>{name}</h1>

              <div className='repo__links'>
                <Popup
                  content='Back to search'
                  trigger={
                    <Link to='/' aria-label='Back to search'>
                      <Icon name='arrow left' />
                    </Link>
                  }
                />
                <Popup
                  content='View on Github'
                  trigger={
                    <a href={html_url} target='_blank' rel='noreferrer' aria-label='View on Github'>
                      <Icon name='github' />
                    </a>
                  }
                />
              </div>
            </div>

            <div className='repo__owner'>
              <img
                className='ui avatar image'
                width='50'
                height='50'
                src={avatar_url}
                alt={login}
              />
              <span>{login}</span>
            </div>
          </header>

          <p>{description}</p>

          <div className='repo__counts'>
            <Count className='ui label large' count={stargazers_count} title='Stars' icon='star' />
            <Count className='ui label large' count={forks_count} title='Forks' icon='sitemap' />
            <Count
              className='ui label large'
              count={subscribers_count}
              title='Subscribers'
              icon='eye'
            />
            <Count
              className='ui label large'
              count={open_issues_count}
              title='Issues'
              icon='bullseye'
            />
          </div>
        </article>
      )}
    </main>
  );
};

export default RepositoryDetail;
