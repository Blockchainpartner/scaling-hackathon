import React, { FC } from "react";
import { useRouter } from "next/dist/client/router";
import QuitIcon from "./icons/QuitIcon";
import useAccount from "../contexts/account";
import { AccountCtx } from "../utils/types";
import { useToasts } from "react-toast-notifications";

const TorusLogout: FC = () => {
  const router = useRouter();
  const accountCtx = useAccount() as AccountCtx;
  const { addToast } = useToasts();

  const onLogout = async () => {
    try {
      await accountCtx.openLogin?.logout();
      router.push("/");
    } catch (_e) {
      addToast("Something went wrong while logging out", {
        appearance: "error",
      });
    }
  };

  return (
    <div className="sidebtn" onClick={onLogout}>
      <QuitIcon color="#C84B4B" />
    </div>
  );
};

export default TorusLogout;
