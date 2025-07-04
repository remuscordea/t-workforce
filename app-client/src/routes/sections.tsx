import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const JobsPage = lazy(() => import('src/pages/jobs'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
}

export const routesSection: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { index: true, element: <SignInPage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
    ],
  },
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [{ path: 'jobs', element: <JobsPage /> }],
  },
  // {
  //   path: 'sign-in',
  //   element: (
  //     <AuthLayout>
  //       <SignInPage />
  //     </AuthLayout>
  //   ),
  // },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
