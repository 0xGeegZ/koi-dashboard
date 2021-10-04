import Head from "next/head";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { ThemeProvider } from "styled-components";
import { theme } from "../client/components/utils/styledComponents";
import { client } from "../client/graphql/client";
import Layout from "../client/components/Layout";
import { initRouteLoader } from "../client/components/utils/RouteLoader";
import "../styles/global.css";

initRouteLoader();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        <Head>
          <title>MyKoi dashboard</title>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0c4184" />
          <meta name="msapplication-TileColor" content="#0c4184" />
          <meta name="theme-color" content="#0c4184" />
        </Head>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default CustomApp;
