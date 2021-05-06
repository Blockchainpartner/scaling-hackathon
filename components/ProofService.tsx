import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import useAccount from "../contexts/account";
import { AccountCtx, MockService } from "../utils/types";

const ProofService: FC<{ service: MockService }> = ({ service }) => {
  const router = useRouter();
  const { logo, title, issuer, description } = service;
  const accountCtx = useAccount() as AccountCtx;
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
          className="btn-primary"
          disabled={!service.cta || !accountCtx?.openLogin}
          onClick={() =>
            service.cta
              ? router.push(`proof/${service.cta?.path as string}`)
              : null
          }
        >
          {service.cta?.title || "UNAVAILABLE"}
        </button>
      </div>

      {!service.cta ? (
        <p className="flex w-full justify-end mt-2 text-xs text-lDark italic">
          This is mock data
        </p>
      ) : null}
      {!accountCtx?.openLogin && service.cta ? (
        <p className="flex w-full justify-end mt-2 text-xs text-lDark italic">
          You need to be logged in. Try visiting the ID page.
        </p>
      ) : null}
    </div>
  );
};

export default ProofService;
