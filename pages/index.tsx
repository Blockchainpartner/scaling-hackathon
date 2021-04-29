import React from "react";
import dynamic from "next/dynamic";

const IndexPage = () => {
  const TorusSetupButton = dynamic(
    // @ts-ignore
    () => import("../components/TorusSetup.tsx"),
    { ssr: false }
  );

  return (
    <div className="bg-bg flex items-center justify-center min-h-screen py-2">
      <img
        src="/images/homeGroup.png"
        alt="Turo Proof"
        className="h-1/3 w-1/3 mr-6"
      />
      <div className="flex flex-col items-start w-1/3 ml-24">
        <img src="/images/fullLogo.png" alt="Turo Proof" className="h-20" />
        <p className="text-dark font-semibold text-3xl w-2/3 mt-8">
          Prove your identity features without revealing it.
        </p>
        <TorusSetupButton />
        <div className="flex flex-col items-start mt-24">
          <p className="text-mGray text-lg">Powered by</p>
          <div className="mt-6 flex justify-start">
            <img src="/images/logoTorus.png" alt="Torus" className="h-8" />
            <img src="/images/logoCairo.png" alt="Cairo" className="h-8 ml-3" />
            <img src="/images/logoStark.svg" alt="Stark" className="h-8 ml-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
