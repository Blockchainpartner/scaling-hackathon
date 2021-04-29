import React, { FC, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";
import { useRouter } from "next/dist/client/router";
import QuitIcon from "./icons/QuitIcon";

const VERIFIER = {
  loginProvider: "google",
  clientId:
    "BKQWaPaXrysRPuTPHC_3_x5rCeR5-e0C4nQbXFRYF_plX72Du3a03DJNhw0btY5lI6L6lruPjE7p42JxwaBVU0M",
};

const TorusLogout: FC = () => {
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
        setPrivKey(openlogin.privKey);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onLogout = async () => {
    if (isLoading || !privKey) return;
    setLoading(true);
    try {
      await openlogin?.logout();
      setPrivKey(undefined);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebtn" onClick={onLogout}>
      <QuitIcon color="#C84B4B" />
    </div>
  );
};

export default TorusLogout;
