import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, List, Loader, Pagination } from 'semantic-ui-react';
import { Count } from '../../components';

import { useQuery, useQueryClient } from 'react-query';
import { useDebounce } from 'use-debounce';

import { RepoSearchResponse, searchRepos } from '../../api/RepoAPI';

import './Search.scss';

const languageOptions = [
  { key: 'all', value: 'default', text: 'All languages' },
  { key: 'C', value: 'C', text: 'C' },
  { key: 'C++', value: 'C++', text: 'C++' },
  { key: 'C#', value: 'C#', text: 'C#' },
  { key: 'Go', value: 'Go', text: 'Go' },
  { key: 'Java', value: 'Java', text: 'Java' },
  { key: 'JavaScript', value: 'JavaScript', text: 'JavaScript' },
  { key: 'PHP', value: 'PHP', text: 'PHP' },
  { key: 'Python', value: 'Python', text: 'Python' },
  { key: 'Ruby', value: 'Ruby', text: 'Ruby' },
  { key: 'Scala', value: 'Scala', text: 'Scala' },
  { key: 'TypeScript', value: 'TypeScript', text: 'TypeScript' },
];

const sortOptions = [
  { key: 'best', value: 'default', text: 'Best Match' },
  { key: 'stars', value: 'stars', text: 'Most Stars' },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch] = useDebounce(searchTerm, 400);

  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [language, setLanguage] = useState(languageOptions[0].value);

  const { data, isLoading, error } = useQuery<RepoSearchResponse, Error>(
    [debouncedSearch, sort, language, page],
    () => searchRepos(debouncedSearch, { page, sort, language }),
    { enabled: !!debouncedSearch, retry: false }
  );

  const { items, total_count = 0 } = data || {};

  const totalPages = Math.ceil(total_count / 20);

  const queryClient = useQueryClient();

  // Prefetch the next page
  useEffect(() => {
    if (page + 1 <= totalPages) {
      queryClient.prefetchQuery(['companies', page + 1, debouncedSearch], () => {
        return searchRepos(debouncedSearch, {
          page: page + 1,
          sort,
          language,
        });
      });
    }
  }, [data, page, debouncedSearch, queryClient, totalPages, sort, language]);

  // Reset the page number to 1 if the input changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // console.log('data', data);

  const handlePageChange = useCallback((_, data) => setPage(data.activePage), [setPage]);

  return (
    <Container text>
      <h1>Repositories</h1>
      <Form>
        <Form.Input
          type='text'
          aria-label='Search for Github repositories'
          placeholder='Search for repositories'
          icon='search'
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />

        <Form.Group>
          <Form.Field>
            <Form.Select
              id='sort'
              name='sort'
              label='Sort'
              options={sortOptions}
              value={sort}
              onChange={(_, { value }) => setSort(value as string)}
            />
          </Form.Field>

          <Form.Field>
            <Form.Select
              id='language'
              name='language'
              label='Language'
              options={languageOptions}
              value={language}
              onChange={(_, { value }) => setLanguage(value as string)}
            />
          </Form.Field>
        </Form.Group>
      </Form>

      <Loader active={isLoading} />

      {/* Error */}
      {error && !items?.length && <p>{error.message}</p>}

      {/* Success */}
      {items?.length ? (
        <List divided relaxed>
          {items?.map(({ id, full_name, stargazers_count }) => {
            return (
              <List.Item className='list-item' key={id}>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <Link to={`/repositories/${full_name}`} className='list-item__link'>
                    <List.Header>{full_name}</List.Header>
                    <Count icon='star' count={stargazers_count} />
                  </Link>
                  {/* <List.Description>Updated 10 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      ) : null}

      {/* Empty */}
      {items?.length === 0 && <p>No results found. Please try expanding your search.</p>}

      {/* Pagination */}
      {items?.length && (
        <Container textAlign='center'>
          <Pagination
            defaultActivePage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            boundaryRange={0}
            firstItem={null}
            lastItem={null}
            ellipsisItem={null}
          />
        </Container>
      )}
    </Container>
  );
};

export default Search;
