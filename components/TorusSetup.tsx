import React, { FC, useEffect, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";
import Torus from "@toruslabs/torus-embed";
import DirectWebSdk from "@toruslabs/torus-direct-web-sdk";

const VERIFIER = {
  loginProvider: "google",
  clientId: "YOUR PROJECT ID",
};

const TorusSetup: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [openlogin, setOpenLogin] = useState<undefined | OpenLogin>();
  const [privKey, setPrivKey] = useState<undefined | string>();
  const [torus, setTorus] = useState<any>();
  const [account, setAccount] = useState<any>();

  console.log("TORUS", torus);

  useClientEffect(() => {
    (async function () {
      try {
        //Torus Wallet
        const torus = new Torus({ buttonPosition: "top-right" });
        await torus.init({
          enableLogging: false,
        });
        setTorus(torus);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onLogin = async () => {
    if (isLoading || !torus) return;
    await torus?.login();
  };

  //Grab account when logged in
  useEffect(() => {
    (async function () {
      if (torus && torus?.isLoggedIn) {
        const userInfo = await torus.getUserInfo();
        setAccount(userInfo);
      }
      if (typeof window !== "undefined") {
        let data = window.sessionStorage.getItem("torus-app");
        console.log("DATAAAA", data);
      }
    })();
  }, [torus]);

  return (
    <button className="btn-primary mt-12 w-1/3" onClick={onLogin}>
      {isLoading ? "⏳" : "GET STARTED"}
    </button>
  );
};

export default TorusSetup;
