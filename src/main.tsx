import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { store } from "./app/store";
import { router } from "./app/router";
import { SessionBootstrap } from "./app/SessionBootstrap";
import { appConfig } from "./app/config";
import { GoogleOneTap } from "./features/auth/GoogleOneTap";
import "./styles/globals.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        {appConfig.googleClientId && <GoogleOneTap />}
        <SessionBootstrap><RouterProvider router={router} /></SessionBootstrap>
        <Toaster position="bottom-right" richColors closeButton />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  appConfig.googleClientId ? <GoogleOAuthProvider clientId={appConfig.googleClientId}>{app}</GoogleOAuthProvider> : app,
);
