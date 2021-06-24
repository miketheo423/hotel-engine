import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Search, RepositoryDetail } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          {/* Search */}
          <Route exact path='/' component={Search} />

          {/* Detail */}
          <Route exact path='/repositories/:owner/:repo' component={RepositoryDetail} />

          {/* Default Path */}
          <Redirect to='/' />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
