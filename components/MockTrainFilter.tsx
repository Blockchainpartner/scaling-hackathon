import React, { FC } from "react";

const MockTrainFilter: FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-col items-start mr-10">
        <p className="text-lg">Departure</p>
        <div className="rounded-lg py-2 px-4 bg-white w-40">🇫🇷 Paris</div>
      </div>
      <div className="flex flex-col items-start mr-10">
        <p className="text-lg">Destination</p>
        <div className="rounded-lg py-2 px-4 bg-white w-40">🇫🇷 Marseille</div>
      </div>
      <div className="flex flex-col items-start mr-10">
        <p className="text-lg">Date</p>
        <div className="rounded-lg py-2 px-4 bg-white w-40">📅 08/9/2021</div>
      </div>
    </div>
  );
};

export default MockTrainFilter;
