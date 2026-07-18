/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { ErrorBoundary } from "./ErrorBoundary";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { LegacyPostRedirect, LegacyUserRedirect } from "../routes/LegacyRedirects";

const HomePage = lazy(() => import("../routes/HomePage"));
const PostPage = lazy(() => import("../routes/PostPage"));
const ProfilePage = lazy(() => import("../routes/ProfilePage"));
const CreatePostPage = lazy(() => import("../routes/CreatePostPage"));
const SearchPage = lazy(() => import("../routes/SearchPage"));
const ExplorePage = lazy(() => import("../routes/ExplorePage"));
const StaticPage = lazy(() => import("../routes/StaticPage"));
const AuthPage = lazy(() => import("../routes/AuthPage"));
const NotFoundPage = lazy(() => import("../routes/NotFoundPage"));
const CollectionPage = lazy(() => import("../routes/CollectionPage"));
const EditPostPage = lazy(() => import("../routes/EditPostPage"));
const EditProfilePage = lazy(() => import("../routes/EditProfilePage"));
const NotificationsPage = lazy(() => import("../routes/NotificationsPage"));
const ModerationPage = lazy(() => import("../routes/ModerationPage"));

const pending = <div className="page container"><div className="feed-status" aria-live="polite">Preparing the page…</div></div>;
const withSuspense = (element: React.ReactNode) => <Suspense fallback={pending}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "p/:slugId", element: withSuspense(<PostPage />) },
      { path: "u/:username", element: withSuspense(<ProfilePage />) },
      { path: "c/:slugId", element: withSuspense(<CollectionPage />) },
      { path: "search", element: withSuspense(<SearchPage />) },
      { path: "explore/:category", element: withSuspense(<ExplorePage />) },
      { path: "about", element: withSuspense(<StaticPage page="about" />) },
      { path: "guidelines", element: withSuspense(<StaticPage page="guidelines" />) },
      { path: "privacy", element: withSuspense(<StaticPage page="privacy" />) },
      { path: "terms", element: withSuspense(<StaticPage page="terms" />) },
      { path: "auth/:mode", element: withSuspense(<AuthPage />) },
      { path: "post/:id", element: <LegacyPostRedirect /> },
      { path: "user/:id", element: <LegacyUserRedirect /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "create", element: withSuspense(<CreatePostPage />) },
          { path: "create-post", element: <Navigate to="/create" replace /> },
          { path: "edit/:id", element: withSuspense(<EditPostPage />) },
          { path: "u/:username/edit", element: withSuspense(<EditProfilePage />) },
          { path: "notifications", element: withSuspense(<NotificationsPage />) },
          { path: "moderation", element: withSuspense(<ModerationPage />) },
        ],
      },
      { path: "not-found", element: withSuspense(<NotFoundPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
