import * as React from "react";
import { AppProps } from "next/app";
import "../style.css";
import Head from "next/head";
import { AccountApp } from "../contexts/account";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Pusher from 'pusher-js';

function  WrapperApp({ Component, pageProps }: AppProps) {
  const { addToast } = useToasts();

  React.useEffect(() => {
    const pusher = new Pusher(`391a3ce97ac53af64f6c`, {
      cluster: `eu`,
      authEndpoint: 'http://localhost:8080/pusher'
    });
  
    var channel = pusher.subscribe('private-identity');
    channel.bind('processIdentity', function(data: any) {
      const {registry, step, type} = data;
      console.log(`${registry}: ${step}`);

      if (registry === `161373187550089867448191830760110801114155294027693593477164529548269146668`) {
        addToast(`12-24 discount: ${step}`, {appearance: type || 'info'});
      } else if (registry === `418791004851046193537070596848530790547129451305514433175127304050849890764`) {
        addToast(`60+ discount: ${step}`, {appearance: type || 'info'});
      } else if (registry === `374546399808851745807054416014379391823657543778127138954064098322040293325`) {
        addToast(`Disability discount: ${step}`, {appearance: type || 'info'});
      } else {
        addToast(step, {appearance: type || 'info'});
      }
    });
  }, [])


  return <Component {...pageProps} />
}

export default function App(props: any) {
  return (
    <>
      <Head>
        <title>Turbo Proof</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ToastProvider autoDismiss>
        <AccountApp>
          <WrapperApp {...props} />
        </AccountApp>
      </ToastProvider>
    </>
  );
}
