import React, { FC } from "react";

const MockTrainInfo: FC<{ price: string }> = ({ price }) => {
  return (
    <div className="board flex flex-col xl:flex-row items-start xl:items-center justify-between w-full xl:w-3/5">
      <div className="flex flex-col xl:flex-row items-start xl:items-center">
        <img src={`/images/logoSNCF.png`} alt={"SNCF Logo"} className="h-8" />
        <div className="ml-0 xl:ml-8 flex flex-col items-start">
          <p className="font-bold text-xl">Paris - Marseille</p>
          <p className="font-light text-lg">TGV - direct - 0 stops</p>
        </div>
        <div className="ml-0 xl:ml-8 flex flex-col items-start">
          <p className="font-bold text-xl">13:02 - 16:08</p>
          <p className="font-light text-lg">3h6m</p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-start xl:items-center">
        <p className="font-bold text-2xl mr-8">{price}</p>
      </div>
    </div>
  );
};

export default MockTrainInfo;
