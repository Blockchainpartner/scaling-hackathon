import React from "react";
import CouponIcon from "./icons/CouponIcon";
import YoungIcon from "./icons/SupportIcon";
import SupportIcon from "./icons/YoungIcon";

const TravelReductions = () => {
  return (
    <div className="flex flex-col items-start mt-8">
      <p className="font-semibold text-2xl text-lDark">Price reductions</p>
      <div className="flex flex-col xl:flex-row m-auto xl:m-0 w-2/3">
        <div className="board mt-4 w-1/3 mr-4">
          <div className="flex items-center justify-start relative">
            <SupportIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-1/2 leading-5">
              Disability reduced fare
            </p>
            <input
              type="radio"
              className="absolute top-0 right-0 form-radio h-5 w-5 text-brand cursor-pointer"
            />
          </div>
          <p className="font-bold text-2xl mt-2">88,00€</p>
        </div>
        <div className="board-disabled mt-4 w-1/3 mr-4">
          <div className="flex items-center justify-start relative">
            <YoungIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-1/2 leading-5">
              12-27 yo reduced fare
            </p>
            <input
              type="radio"
              className="absolute top-0 right-0 form-radio h-5 w-5 text-brand cursor-not-allowed"
              disabled
            />
          </div>
          <p className="font-bold text-2xl mt-2">97,00€</p>
        </div>
        <div className="board-disabled bg-lightgray mt-4 w-1/3 mr-4">
          <div className="flex items-center justify-start relative">
            <CouponIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-1/3 leading-5">
              Coupon code
            </p>
            <input
              type="radio"
              className="absolute top-0 right-0 form-radio h-5 w-5 text-brand cursor-not-allowed"
              disabled
            />
          </div>
          <p className="font-bold text-2xl mt-2">-0,00€</p>
        </div>
      </div>
    </div>
  );
};

export default TravelReductions;
