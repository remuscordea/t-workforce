import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { client } from './graphql/client';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import { AuthProvider } from './context/auth-context';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
