import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Loadable from "@/components/utils/Loadable";
import MainLayout from "@/layouts";
import AuthLayout from "@/features/auth/layout";
import ProtectedRoute from "./ProtectedRoute";

const Pages = {
  Home: lazy(() => import("@/features/home/HomePage")),
  Blogs: lazy(() => import("@/features/blog/pages/Blogs")),
  BlogDetails: lazy(() => import("@/features/blog/pages/BlogDetails")),
  AddUpdateBlog: lazy(() => import("@/features/blog/pages/AddUpdateBlog")),
  // EditPost: lazy(() => import("@/features/posts/pages/EditPost")),
  // NotFound: lazy(() => import("@/features/common/pages/NotFound")),
};

const AuthPages = {
  Login: lazy(() => import("@/features/auth/pages/Login")),
  Register: lazy(() => import("@/features/auth/pages/Register")),
};

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Loadable Component={Pages.Home} />,
      },
      {
        path: "blogs",
        element: <Loadable Component={Pages.Blogs} />,
      },
      {
        path: "blogs/:id",
        element: <Loadable Component={Pages.BlogDetails} />,
      },
    ],
  },

  // Protected routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "blog/new",
        element: <Loadable Component={Pages.AddUpdateBlog} />,
      },
      {
        path: "blog/edit/:id",
        element: <Loadable Component={Pages.AddUpdateBlog} />,
      },
    ],
  },

  // Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Loadable Component={AuthPages.Login} />,
      },
      {
        path: "register",
        element: <Loadable Component={AuthPages.Register} />,
      },
    ],
  },

  // Not found
  {
    path: "*",
    // element: <Loadable Component={Pages.NotFound} />,
  },
]);

export default router;
