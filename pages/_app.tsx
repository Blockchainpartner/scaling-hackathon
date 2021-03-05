import * as React from "react";
import {AppProps} from "next/app";
import "../style.css";
import {Provider} from "react-redux";
import {useStore} from "../store/store";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>Kiwi dApp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}