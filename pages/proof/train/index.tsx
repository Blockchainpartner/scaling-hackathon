import React, { FC } from "react";
import MockTrainFilter from "../../../components/MockTrainFilter";
import MockTrainTickets from "../../../components/MockTrainTickets";
import ScreenTitle from "../../../components/ScreenTitle";
import SidebarWrapper from "../../../components/SidebarWrapper";

const TrainProof: FC = () => {
  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Train tickets"
        subTitle="Book a train ticket and get a discounted price with the generate proof"
        hasBack
      />
      <div className="">
        <MockTrainFilter />
        <MockTrainTickets />
      </div>
    </SidebarWrapper>
  );
};

export default TrainProof;
