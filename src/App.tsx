import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.scss';

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
      <div className='App'></div>
    </QueryClientProvider>
  );
}

export default App;
