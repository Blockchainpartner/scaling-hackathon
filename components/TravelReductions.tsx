import React, { ChangeEvent, FC } from "react";
import YoungIcon from "./icons/SupportIcon";
import SupportIcon from "./icons/YoungIcon";

type Props = {
  reductions: { [key: string]: boolean };
  updateReductions: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TravelReductions: FC<Props> = ({ reductions, updateReductions }) => {
  return (
    <div className="flex flex-col items-start mt-8">
      <p className="font-semibold text-2xl text-lDark">Price reductions</p>
      <div className="flex flex-col m-auto xl:m-0 w-2/3">
        <div className="board mt-4 w-1/2 mr-4">
          <div className="flex items-center justify-between relative">
            <input
              name="disability"
              type="checkbox"
              className="form-checkbox h-5 w-5"
              onChange={updateReductions}
              checked={reductions["disability"]}
            />
            <div className="flex items-center">
              <SupportIcon color="#1F169C" />
              <p className="font-semibold text-lg ml-4 w-1/2 leading-5">
                Disability reduced fare
              </p>
            </div>
            <p className="font-bold text-2xl">88,00€</p>
          </div>
        </div>
        <div className="board mt-4 w-1/2 mr-4">
          <div className="flex items-center justify-between relative">
            <input
              name="young"
              type="checkbox"
              className="form-checkbox h-5 w-5"
              onChange={updateReductions}
              checked={reductions["young"]}
            />
            <div className="flex items-center">
              <YoungIcon color="#1F169C" />
              <p className="font-semibold text-lg ml-4 w-1/2 leading-5">
                12-27 yo reduced fare
              </p>
            </div>
            <p className="font-bold text-2xl">97,00€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelReductions;
