import React, { useEffect, useState } from "react";

// Api
import * as AuthApi from "../api/auth";

// Router
import { useRouter } from "next/router";

// Ts
import type { AppProps } from "next/app";

// Styles
import "../styles/globals.scss";
import "../styles/Loader.css";

// Components
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuthState = async () => {
      const data = await AuthApi.isLoggedIn();

      if (!data?.isValid) router.push("/auth/register");
    };

    checkAuthState();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
