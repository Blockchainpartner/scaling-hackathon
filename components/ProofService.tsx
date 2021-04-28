import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import { MockService } from "../utils/types";

const ProofService: FC<{ service: MockService }> = ({ service }) => {
  const router = useRouter();
  const { logo, title, issuer, description } = service;
  return (
    <div className="board">
      <div className="flex justify-start">
        <div className="h-14 w-14 flex justify-center items-center">
          <img src={`/images/${logo}`} alt={"issuer"} className="w-full" />
        </div>
        <div className="flex flex-col items-start ml-6">
          <p className="text-2xl font-semibold">{title}</p>
          <p className="font-light">{issuer}</p>
        </div>
      </div>

      <p className="my-4 text-lg">{description}</p>

      <div className="flex w-full justify-end">
        <button
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!service.cta}
          onClick={() =>
            service.cta
              ? router.push(`proof/${service.cta?.path as string}`)
              : null
          }
        >
          {service.cta?.title || "UNAVAILABLE"}
        </button>
      </div>
    </div>
  );
};

export default ProofService;
