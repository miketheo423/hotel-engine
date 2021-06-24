import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getRepo } from '../../api/RepoAPI';

import { Container, Icon, Popup } from 'semantic-ui-react';
import { Count } from '../../components';

import { Repository } from '../../utils/models/Repository';

import './RepositoryDetail.scss';

interface RepositoryRouteParams {
  owner: string;
  repo: string;
}

const RepositoryDetail = () => {
  const { owner: ownerParam, repo } = useParams<RepositoryRouteParams>();
  const { data, isLoading, isError } = useQuery<Repository, Error>([ownerParam, repo], () =>
    getRepo(ownerParam, repo)
  );
  console.log('data', data);

  if (!data) {
    return null;
  }

  const {
    name,
    description,
    owner,
    html_url,
    stargazers_count,
    subscribers_count,
    forks_count,
    open_issues_count,
  } = data;

  return (
    <Container text className='repo'>
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
              src={owner.avatar_url}
              alt={owner.login}
            />
            <span>{owner.login}</span>
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
    </Container>
  );
};

export default RepositoryDetail;
