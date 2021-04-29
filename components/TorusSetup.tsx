import React, { FC, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";
import { useRouter } from "next/dist/client/router";

const VERIFIER = {
  loginProvider: "google",
  clientId:
    "BKQWaPaXrysRPuTPHC_3_x5rCeR5-e0C4nQbXFRYF_plX72Du3a03DJNhw0btY5lI6L6lruPjE7p42JxwaBVU0M",
};

const TorusSetup: FC = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [openlogin, setOpenLogin] = useState<undefined | OpenLogin>();
  const [privKey, setPrivKey] = useState<undefined | string>();

  useClientEffect(() => {
    (async function () {
      try {
        //OpenLogin
        const openlogin = new OpenLogin({
          clientId: VERIFIER.clientId,
          iframeUrl: "http://beta.openlogin.com",
          network: "testnet",
          redirectUrl: "http://localhost:3000/identity",
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
      await openlogin?.login();
      setPrivKey(openlogin?.privKey);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn-primary mt-12 w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!openlogin || isLoading}
      onClick={privKey ? () => router.push("/identity") : onLogin}
    >
      {isLoading ? "⏳" : "GET STARTED"}
    </button>
  );
};

export default TorusSetup;
