import OpenLogin from "@toruslabs/openlogin";
import { useEffect } from "react";
import useAccount from "../contexts/account";
import { AccountCtx } from "./types";

const VERIFIER = {
  loginProvider: "google",
  clientId:
    "BKQWaPaXrysRPuTPHC_3_x5rCeR5-e0C4nQbXFRYF_plX72Du3a03DJNhw0btY5lI6L6lruPjE7p42JxwaBVU0M",
};

function OpenLoginWindow(): null {
  const accountCtx = useAccount() as AccountCtx;

  async function onMount() {
    try {
      const openlogin = new OpenLogin({
        clientId: VERIFIER.clientId,
        iframeUrl: "http://beta.openlogin.com",
        network: "testnet",
      });
      await openlogin.init();
      accountCtx.set_openLogin(openlogin);
    } catch (e) {
      console.error(e);
    } finally {
      await accountCtx.openLogin?.login({
        loginProvider: VERIFIER.loginProvider,
        fastLogin: true,
      });
    }
  }
  async function onFastLogin() {
    try {
      await accountCtx.openLogin?.login({
        loginProvider: VERIFIER.loginProvider,
        fastLogin: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log(`OPENLOGINSTATUS: ${accountCtx.openLogin !== undefined}`);
    if (!accountCtx.openLogin) {
      onMount();
    } else {
      if (!accountCtx?.account?.privateKey) onFastLogin();
    }
  }, []);

  return null;
}

export default OpenLoginWindow;
