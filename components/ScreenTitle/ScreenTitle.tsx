import React, { FC } from "react";

const ScreenTitle: FC<{ title: string; subTitle: string }> = ({
  title,
  subTitle,
}) => {
  return (
    <div className="flex flex-col items-start mb-16">
      <p className="text-4xl font-bold text-dark">{title}</p>
      <p className="text-lg text-lDark">{subTitle}</p>
    </div>
  );
};

export default ScreenTitle;
