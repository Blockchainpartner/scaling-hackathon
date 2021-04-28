import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import BackIcon from "./icons/BackIcon";

const ScreenTitle: FC<{
  title: string;
  subTitle: string;
  hasBack?: boolean;
}> = ({ title, subTitle, hasBack }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start mb-16">
      <div className="flex items-center">
        {hasBack ? (
          <div onClick={() => router.back()}>
            <BackIcon color="#17181C" />
          </div>
        ) : null}
        <p className="text-4xl font-bold text-dark">{title}</p>
      </div>
      <p className="text-lg text-lDark">{subTitle}</p>
    </div>
  );
};

export default ScreenTitle;
