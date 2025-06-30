import type { RouteObject } from "react-router";

import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { AuthLayout } from "@/layouts/auth";
import { DashboardLayout } from "@/layouts/dashboard";

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import("@/react-pages/dashboard"));
export const BlogPage = lazy(() => import("@/react-pages/blog"));
export const UserPage = lazy(() => import("@/react-pages/user"));
export const SignInPage = lazy(() => import("@/react-pages/sign-in"));
export const ProductsPage = lazy(() => import("@/react-pages/products"));
export const Page404 = lazy(() => import("@/react-pages/page-not-found"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => alpha(theme.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "user", element: <UserPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "blog", element: <BlogPage /> },
    ],
  },
  {
    path: "sign-in",
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: "404",
    element: <Page404 />,
  },
  { path: "*", element: <Page404 /> },
];
