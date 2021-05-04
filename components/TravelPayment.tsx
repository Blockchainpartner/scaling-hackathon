import React from "react";
import CardDateIcon from "./icons/CardDateIcon";
import CardNameIcon from "./icons/CardNameIcon";
import CardNumberIcon from "./icons/CardNumberIcon";
import CardZipIcon from "./icons/CardZipIcon";

const TravelPayment = () => {
  return (
    <div className="board mt-8 w-2/3">
      <p className="font-semibold text-2xl text-lDark mb-4">Payment</p>
      <form>
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Card Holder
          </label>
          <div className="relative">
            <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
              <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                <CardNameIcon color="gray" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Card Holder"
              value="Patrick Bateman"
              className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Card Number
          </label>
          <div className="relative">
            <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
              <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                <CardNumberIcon color="gray" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Card Number"
              value="4539 6401 2518 0781"
              className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col mb-4 flex-grow mr-2">
            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              CVV
            </label>
            <div className="relative">
              <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                  <CardZipIcon color="gray" />
                </div>
              </div>
              <input
                type="text"
                placeholder="CVV"
                value="745"
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4 flex-grow ml-2">
            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              Date
            </label>
            <div className="relative">
              <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                  <CardDateIcon color="gray" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Date"
                value="26/08"
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <p className="font-light text-gray-800 text-sm mb-2">Accepted cards</p>
        <div className="flex items-center justify-start">
          <img src={`/images/logoMC.png`} alt={"SNCF Logo"} className="h-6" />
          <img
            src={`/images/logoVISA.png`}
            alt={"SNCF Logo"}
            className="h-6 ml-4"
          />
          <img
            src={`/images/logoPP.png`}
            alt={"SNCF Logo"}
            className="h-6 ml-4"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPayment;
