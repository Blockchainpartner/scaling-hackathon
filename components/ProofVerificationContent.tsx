import Pusher from "pusher-js";
import React, { FC, useEffect, useState } from "react";
import CheckIcon from "./icons/CheckIcon";

const ProofVerificationContent: FC = () => {
  const [steps, setSteps] = useState<string[] | undefined>();
  useEffect(() => {
    const pusher = new Pusher(`391a3ce97ac53af64f6c`, {
      cluster: `eu`,
      authEndpoint: "http://localhost:8080/pusher",
    });

    const channelClaims = pusher.subscribe("private-claims");
    channelClaims.bind("processClaim", function (data: any) {
      const { step } = data;
      let locSteps = steps || [];
      locSteps.push(step);
      setSteps(locSteps);
    });
  }, [steps]);

  return (
    <div className="flex flex-col">
      {steps ? (
        steps.map((step, idx) => (
          <div className="flex my-2 items-start" key={idx}>
            {idx === steps?.length - 1 ? (
              <div className="donutSpinner smallSpinner mb-4" />
            ) : (
              <CheckIcon color="#0CAB2C" />
            )}
            <p className="sm ml-2">{step}</p>
          </div>
        ))
      ) : (
        <div className="donutSpinner mb-4" />
      )}
    </div>
  );
};

export default ProofVerificationContent;
