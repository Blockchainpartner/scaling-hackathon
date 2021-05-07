import Pusher from "pusher-js";
import React, { FC, useEffect, useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import ErrorIcon from "./icons/ErrorIcon";

type Props = {
  success?: string;
  error?: string;
};

const ProofVerificationContent: FC<Props> = ({ success, error }) => {
  const [currentStep, setCurrentStep] = useState<string | undefined>();
  useEffect(() => {
    const pusher = new Pusher(`391a3ce97ac53af64f6c`, {
      cluster: `eu`,
      authEndpoint: "http://localhost:8080/pusher",
    });

    const channelClaims = pusher.subscribe("private-claims");
    channelClaims.bind("processClaim", function (data: any) {
      const { step } = data;
      setCurrentStep(step);
    });
  }, [success, error]);

  return (
    <div className="flex flex-col">
      {currentStep ? (
        <div className="flex my-2 items-start">
          {success ? <CheckIcon color="#0CAB2C" /> : null}
          {error ? <ErrorIcon color="#C84B4B" /> : null}
          {!success && !error ? (
            <div className="donutSpinner smallSpinner mb-4 mr-2" />
          ) : null}
          {!success && !error ? (
            <p>{currentStep}</p>
          ) : (
            <p className="ml-2">{success || error}</p>
          )}
        </div>
      ) : (
        <div className="donutSpinner mb-4" />
      )}
    </div>
  );
};

export default ProofVerificationContent;
