import React, { FC } from "react";

const IdInfoItem: FC<{ label: string; info: string }> = ({ label, info }) => {
  return (
    <div className="flex items-baseline mb-3">
      <p className="text-lg font-light w-1/3">{label}</p>
      <p className="text-lg text-left">{info}</p>
    </div>
  );
};

export default IdInfoItem;
