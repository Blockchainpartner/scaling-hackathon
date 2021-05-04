import React, { FC } from "react";
import InfoIcon from "../../../../components/icons/InfoIcon";
import MockTrainInfo from "../../../../components/MockTrainInfo";
import ScreenTitle from "../../../../components/ScreenTitle";
import SidebarWrapper from "../../../../components/SidebarWrapper";
import TravellerInfo from "../../../../components/TravellerInfo";
import TravelReductions from "../../../../components/TravelReductions";

const Book: FC = () => {
  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Train tickets"
        subTitle="Book a train ticket and get a discounted price with the generate proof"
        hasBack
      />
      <div>
        <MockTrainInfo />
        <TravellerInfo />
        <TravelReductions />
        <div className="flex items-center mt-6">
          <InfoIcon color="black" />
          <p className="text-sm ml-2">
            Before payment a proof of your situation will be generated based on
            your identification
          </p>
        </div>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <button className="btn-primary w-1/6">BOOK - 112,00€</button>
      </div>
    </SidebarWrapper>
  );
};

export default Book;
