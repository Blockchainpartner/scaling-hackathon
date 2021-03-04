import * as React from "react";
import {AppProps} from "next/app";
import "../style.css";
import {Provider} from "react-redux";
import {useStore} from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}