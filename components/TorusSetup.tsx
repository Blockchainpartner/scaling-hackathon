import React, { FC, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";
import { useRouter } from "next/dist/client/router";
import useAccount from "../contexts/account";
import { AccountCtx } from "../utils/types";

const VERIFIER = {
  loginProvider: "google",
  clientId:
    "BKQWaPaXrysRPuTPHC_3_x5rCeR5-e0C4nQbXFRYF_plX72Du3a03DJNhw0btY5lI6L6lruPjE7p42JxwaBVU0M",
};

const TorusSetup: FC = () => {
  const router = useRouter();
  const accountCtx = useAccount() as AccountCtx
  const [isLoading, setLoading] = useState(true);

  async function onMount() {
    try {
      //OpenLogin
      const openlogin = new OpenLogin({
        clientId: VERIFIER.clientId,
        iframeUrl: "http://beta.openlogin.com",
        network: "testnet",
        redirectUrl: "http://localhost:3000",
      });
      await openlogin.init();
      accountCtx.set_openLogin(openlogin);
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  }

  async function onLogin() {
    if (isLoading || accountCtx.account?.privateKey)
      return;
    
    setLoading(true);
    try {
      await accountCtx.openLogin?.login({
        loginProvider: VERIFIER.loginProvider,
        redirectUrl: "http://localhost:3000",
      });
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  useClientEffect(() => onMount(), [])
  useClientEffect(() => {
    if (accountCtx.account) {
      router.push(`/identity`)
    }
  }, [accountCtx?.account?.privateKey])

  return (
    <button
      className="btn-primary mt-12 w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!accountCtx.openLogin || isLoading}
      onClick={accountCtx.account?.privateKey ? () => router.push("/identity") : onLogin}
    >
      {isLoading ? "⏳" : "GET STARTED"}
    </button>
  );
};

export default TorusSetup;
