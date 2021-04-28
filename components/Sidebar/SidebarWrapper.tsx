import { useRouter } from "next/dist/client/router";
import React, { FC, ReactNode } from "react";
import HelpIcon from "../icons/HelpIcon";
import HomeIcon from "../icons/HomeIcon";
import ProfileIcon from "../icons/ProfileIcon";
import QuitIcon from "../icons/QuitIcon";

const SidebarWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <div className="bg-bg flex min-h-screen h-full w-full">
      <nav className="bg-dark w-20 h-full flex flex-col items-center justify-between py-2">
        <div>
          <div className="sidebtn">
            <img src="/images/turbo.svg" alt="Sidebar icon" className="p-4" />
          </div>
          <div className="h-1 w-1/2 bg-white rounded-sm my-4 mx-auto" />
          <div className={pathname === "/home" ? "sidebtn-active" : "sidebtn"}>
            <HomeIcon color={pathname === "/home" ? "white" : "lightgray"} />
          </div>
          <div
            className={pathname === "/identity" ? "sidebtn-active" : "sidebtn"}
          >
            <ProfileIcon
              color={pathname === "/identity" ? "white" : "lightgray"}
            />
          </div>
        </div>
        <div>
          <div className="sidebtn">
            <HelpIcon color="lightgray" />
          </div>
          <div className="sidebtn">
            <QuitIcon color="#C84B4B" />
          </div>
        </div>
      </nav>
      <div className="py-24 px-40 w-full">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
