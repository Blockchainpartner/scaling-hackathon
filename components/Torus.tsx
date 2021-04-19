import React, { FC, useState } from "react";

import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";

const VERIFIER = {
  loginProvider: "google",
  clientId: "YOUR PROJECT ID",
};
const TorusInit: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [openlogin, setOpenLogin] = useState<undefined | OpenLogin>();
  const [privKey, setPrivKey] = useState<undefined | string>();

  useClientEffect(() => {
    (async function () {
      try {
        const openlogin = new OpenLogin({
          clientId: VERIFIER.clientId,
          iframeUrl: "http://beta.openlogin.com",
          network: "testnet",
        });
        setOpenLogin(openlogin);
        await openlogin.init();
        setPrivKey(openlogin.privKey);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onLogin = async () => {
    if (isLoading || privKey) return;

    setLoading(true);
    try {
      await openlogin?.login({
        loginProvider: VERIFIER.loginProvider,
        redirectUrl: "http://localhost:3000",
      });
      setPrivKey(openlogin?.privKey);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return privKey ? (
    <div>Logged in: {privKey}</div>
  ) : (
    <button onClick={onLogin}>Login</button>
  );
};

export default TorusInit;
