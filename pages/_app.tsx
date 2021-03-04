import * as React from "react";
import {AppProps} from "next/app";
import "../style.css";

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp