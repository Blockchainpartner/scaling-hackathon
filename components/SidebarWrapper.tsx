import React, { FC, ReactNode } from "react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import HelpIcon from "./icons/HelpIcon";
import HomeIcon from "./icons/HomeIcon";
import ProfileIcon from "./icons/ProfileIcon";

const SidebarWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const TorusLogoutButton = dynamic(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => import("../components/TorusLogout.tsx"),
    { ssr: false }
  );

  const router = useRouter();
  const pathname = "/" + router.pathname.split("/")[1];
  return (
    <div className="bg-bg flex min-h-screen w-full">
      <nav className="bg-dark w-20 h-screen fixed flex flex-col items-center justify-between py-2">
        <div>
          <div className="sidebtn bg-white" onClick={() => router.push("/")}>
            <img src="/images/alexandria.png" alt="Sidebar icon" className="p-2" />
          </div>
          <div className="h-1 w-1/2 bg-white rounded-sm my-4 mx-auto" />
          <div
            className={pathname === "/proof" ? "sidebtn-active" : "sidebtn"}
            onClick={() => router.push("/proof")}
          >
            <HomeIcon color={pathname === "/proof" ? "white" : "lightgray"} />
          </div>
          <div
            className={pathname === "/identity" ? "sidebtn-active" : "sidebtn"}
            onClick={() => router.push("/identity")}
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
          <TorusLogoutButton />
        </div>
      </nav>
      <div className="py-24 mx-40 w-full">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
