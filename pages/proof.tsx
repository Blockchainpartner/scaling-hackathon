import React, { FC } from "react";
import ProofService from "../components/ProofService";
import ScreenTitle from "../components/ScreenTitle";
import SidebarWrapper from "../components/SidebarWrapper";
import { mockServices } from "../utils/mockServices";
import { MockService } from "../utils/types";

const Home: FC = () => {
  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Proof Services"
        subTitle="Select a proof you want to generate for any service"
      />
      <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-8 w-7/8">
        {mockServices.map((service: MockService) => (
          <ProofService service={service} key={service.id} />
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default Home;
