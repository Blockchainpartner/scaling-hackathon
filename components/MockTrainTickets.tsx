import React, { FC } from "react";

const MockItem: FC<{ time: string; price: string }> = ({ time, price }) => {
  return (
    <div className="board flex flex-col xl:flex-row items-start xl:items-center justify-between w-full xl:w-4/5">
      <div className="flex flex-col xl:flex-row items-start xl:items-center">
        <img src={`/images/logoSNCF.png`} alt={"SNCF Logo"} className="h-8" />
        <div className="ml-0 xl:ml-8 flex flex-col items-start">
          <p className="font-bold text-xl">Paris - Marseille</p>
          <p className="font-light text-lg">TGV - direct - 0 stops</p>
        </div>
        <div className="ml-0 xl:ml-8 flex flex-col items-start">
          <p className="font-bold text-xl">{time}</p>
          <p className="font-light text-lg">3h6m</p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-start xl:items-center">
        <p className="font-bold text-2xl mr-8">{price}</p>
        <button className="btn-primary h-12">BOOK</button>
      </div>
    </div>
  );
};

const MockTrainTickets = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      <MockItem time="13:08 - 16:14" price="112,00€" />
      <MockItem time="15:08 - 18:14" price="112,00€" />
      <MockItem time="19:08 - 21:14" price="112,00€" />
    </div>
  );
};

export default MockTrainTickets;
