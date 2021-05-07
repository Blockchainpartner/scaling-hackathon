import * as React from "react";
import { AppProps } from "next/app";
import "../style.css";
import Head from "next/head";
import { AccountApp } from "../contexts/account";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Pusher from "pusher-js";
import { REGISTRIES } from "../utils/utils";

function WrapperApp({ Component, pageProps }: AppProps) {
  const { addToast } = useToasts();

  React.useEffect(() => {
    const pusher = new Pusher(`391a3ce97ac53af64f6c`, {
      cluster: `eu`,
      authEndpoint: "http://localhost:8080/pusher",
    });

    const channelIdentity = pusher.subscribe("private-identity");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channelIdentity.bind("processIdentity", function (data: any) {
      const { registry, step, type } = data;
      console.log(`${registry}: ${step}`);

      if (registry === REGISTRIES.YOUNG) {
        addToast(`12-24 discount: ${step}`, { appearance: type || "info" });
      } else if (registry === REGISTRIES.OLD) {
        addToast(`60+ discount: ${step}`, { appearance: type || "info" });
      } else if (registry === REGISTRIES.DISABILITY) {
        addToast(`Disability discount: ${step}`, {
          appearance: type || "info",
        });
      } else {
        addToast(step, { appearance: type || "info" });
      }
    });

    const channelClaims = pusher.subscribe("private-claims");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channelClaims.bind("processClaim", function (data: any) {
      const { registry, step, type } = data;
      console.log(`${registry}: ${step}`);
      if (registry === REGISTRIES.YOUNG) {
        addToast(`12-24 discount: ${step}`, { appearance: type || "info" });
      } else if (registry === REGISTRIES.OLD) {
        addToast(`60+ discount: ${step}`, { appearance: type || "info" });
      } else if (registry === REGISTRIES.DISABILITY) {
        addToast(`Disability discount: ${step}`, {
          appearance: type || "info",
        });
      } else {
        addToast(step, { appearance: type || "info" });
      }
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return <Component {...pageProps} />;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App(props: any): React.ReactNode {
  return (
    <>
      <Head>
        <title>Alexandria</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
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
