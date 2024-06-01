import './App.css';
import Router from 'routes';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'modules/common/components';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CssBaseline } from '@mui/material';

import { NestedProvider } from 'context/NestedProvider';
import AxiosInterceptor from 'modules/common/utils/axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <NestedProvider>
        <AxiosInterceptor />

        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Header />

          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </NestedProvider>
    </>
  );
}

export default App;
