import React, { FC, useEffect, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";
import Torus from "@toruslabs/torus-embed";

const VERIFIER = {
  loginProvider: "google",
  clientId: "YOUR PROJECT ID",
};

const notLoggedIn = () => {
  return (
    <div className="flex items-start p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
      <div className="circle bg-blue-500 mr-6">
        <span />
      </div>
      <div>
        <h3 className="text-2xl font-bold">Profile &rarr;</h3>
        <p className="mt-4 text-xl">Login to see your information.</p>
      </div>
    </div>
  );
};

const profile = (account: any, privKey: string, onLogout: () => void) => {
  return (
    <div className="flex items-start p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
      {account ? (
        <img src={account.profileImage} alt={account.name} className="mr-4" />
      ) : (
        <div className="circle bg-blue-500 mr-4">
          <span />
        </div>
      )}
      {account ? (
        <div>
          <h3 className="text-2xl font-bold">{account.name} &rarr;</h3>
          <p className="mt-1 text-sm break-all">{account.email}</p>
          <p
            className="mt-4 text-xs text-right underline cursor-pointer text-red-500 hover:text-red-500"
            onClick={onLogout}
          >
            Logout
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">Private key &rarr;</h3>
          <p className="mt-4 text-sm break-all">{privKey}</p>
          <p
            className="mt-4 text-xs text-right underline cursor-pointer text-red-500 hover:text-red-500"
            onClick={onLogout}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

const TorusInit: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [openlogin, setOpenLogin] = useState<undefined | OpenLogin>();
  const [privKey, setPrivKey] = useState<undefined | string>();
  const [torus, setTorus] = useState<any>();
  const [account, setAccount] = useState<any>();

  useClientEffect(() => {
    (async function () {
      try {
        //OpenLogin
        const openlogin = new OpenLogin({
          clientId: VERIFIER.clientId,
          iframeUrl: "http://beta.openlogin.com",
          network: "testnet",
        });
        setOpenLogin(openlogin);
        await openlogin.init();
        setPrivKey(openlogin.privKey);

        //Torus Wallet
        const torus = new Torus({});
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

  const onLogout = async () => {
    if (isLoading || !privKey) return;
    setLoading(true);
    try {
      await openlogin?.logout();
      setPrivKey(undefined);
    } finally {
      setLoading(false);
    }
  };

  const onTorusLogin = async () => {
    if (isLoading || !torus) return;
    await torus?.login({ verifier: VERIFIER.loginProvider });
  };

  //Grab account when logged in
  useEffect(() => {
    (async function () {
      if (torus && torus?.isLoggedIn) {
        const userInfo = await torus.getUserInfo();
        setAccount(userInfo);
      }
    })();
  }, [torus]);

  //   const getProfile = async () => {};

  console.log("OL", openlogin);
  console.log("PK", privKey);
  console.log("ACC", account);
  console.log("TORUS", torus);

  if (isLoading) return <div className="animate-pulse text-3xl">⏳</div>;
  return privKey || torus?.isLoggedIn ? (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      {profile(account, privKey as string, onLogout)}
    </div>
  ) : (
    <div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-600 text-white py-2 px-3 rounded-md mr-2"
          onClick={onLogin}
        >
          OpenLogin
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-3 rounded-md ml-2"
          onClick={onTorusLogin}
        >
          Torus Wallet
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        {notLoggedIn()}
      </div>
    </div>
  );
};

export default TorusInit;
