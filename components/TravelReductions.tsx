import axios from "axios";
import { ethers } from "ethers";
import React, { FC } from "react";
import { useToasts } from "react-toast-notifications";
import { useAccount } from "../contexts/account";
import { AccountCtx } from "../utils/types";
import {
  hashSecret,
  modCairoPrime,
  addCairoPrime,
  REGISTRIES,
} from "../utils/utils";
import CouponIcon from "./icons/CouponIcon";
import YoungIcon from "./icons/SupportIcon";
import SupportIcon from "./icons/YoungIcon";

type Props = {
  setProof: (v: any) => void;
  reductions: { [key: string]: boolean };
  setReductions: (v: { [key: string]: boolean }) => void;
  generateProof: () => void;
};

const TravelReductions: FC<Props> = ({
  setProof,
  reductions,
  setReductions,
  generateProof,
}) => {
  const accountCtx = useAccount() as AccountCtx;
  const { addToast } = useToasts();

  async function checkProof(
    registryKey: string,
    hash: string,
    registryHash: string
  ) {
    const provider = new ethers.providers.AlchemyProvider(
      "ropsten",
      process.env.ALCHEMY_KEY
    );
    const ABI = [
      "function proveIdentity(uint256 registryKey, uint256 hash, uint256 registryHash) public view returns (bool)",
    ];
    const smartContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS as string,
      ABI,
      provider
    );
    const identityIsProved = await smartContract.proveIdentity(
      registryKey,
      hash,
      registryHash
    );
    if (identityIsProved) {
      addToast("The proof is valid", { appearance: "success" });
    } else {
      addToast("The proof is not valid", { appearance: "error" });
    }
    return identityIsProved;
  }

  async function claimDiscount(registryKey: string) {
    generateProof();
    const address = accountCtx.account.address;
    const privateKey = accountCtx.account.privateKey;
    const secret = await hashSecret(registryKey, modCairoPrime(privateKey));

    try {
      const res = await axios.post(
        `http://localhost:8080/proof/prove/${registryKey}`,
        { address, secret }
      );
      if (res.status === 200) {
        addToast("The proof is submited", { appearance: "success" });
        let proof = res.data.proof;
        let registryHash = res.data.hash;

        if (proof[0] === "-") proof = addCairoPrime(proof);
        if (registryHash[0] === "-") registryHash = addCairoPrime(registryHash);
        setProof(proof);
        setReductions({ ...reductions, [registryKey]: true });
        checkProof(registryKey, proof, registryHash);
      } else {
        addToast("Impossible prove this claim", { appearance: "error" });
      }
    } catch (error) {
      addToast("Impossible prove this claim", { appearance: "error" });
    }
  }

  const reductionClassName = (discount: string) =>
    "board mt-4 w-1/3 mr-4 hover:shadow transition-all hover:border-brand border-2 hover:cursor-pointer " +
    `${reductions[discount] ? "border-brand" : ""}`;

  return (
    <div className="flex flex-col items-start mt-8">
      <p className="font-semibold text-2xl text-lDark">Price reductions</p>
      <div className="flex flex-col xl:flex-row m-auto xl:m-0 w-full">
        <div
          onClick={() => claimDiscount(REGISTRIES.DISABILITY)}
          className={reductionClassName(REGISTRIES.DISABILITY)}
        >
          <div className="flex items-center justify-start relative">
            <SupportIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-full leading-5">
              Disability reduced fare
            </p>
          </div>
          <p className="font-bold text-2xl mt-2">88,00€</p>
        </div>

        <div
          onClick={() => claimDiscount(REGISTRIES.YOUNG)}
          className={reductionClassName(REGISTRIES.YOUNG)}
        >
          <div className="flex items-center justify-start relative">
            <YoungIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-full leading-5">
              12-27 yo reduced fare
            </p>
          </div>
          <p className="font-bold text-2xl mt-2">97,00€</p>
        </div>

        <div
          onClick={() => claimDiscount(REGISTRIES.OLD)}
          className={reductionClassName(REGISTRIES.OLD)}
        >
          <div className="flex items-center justify-start relative">
            <CouponIcon color="#1F169C" />
            <p className="font-semibold text-lg ml-4 w-full leading-5">
              60+ yo reduced fare
            </p>
          </div>
          <p className="font-bold text-2xl mt-2">97,00€</p>
        </div>
      </div>
    </div>
  );
};

export default TravelReductions;
