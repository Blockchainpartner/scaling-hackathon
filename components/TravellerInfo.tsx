import React, { FC } from "react";
import useAccount from "../contexts/account";
import { AccountCtx } from "../utils/types";
import VerifiedBadge from "./icons/VerifiedBadge";

const TravellerInfo: FC = () => {
  const accountCtx = useAccount() as AccountCtx;
  const user = accountCtx.user;

  return (
    <div className="flex flex-col items-start mt-8">
      <p className="font-semibold text-2xl text-lDark">Traveller info</p>
      <div className="board mt-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div>
              <img
                src={user.KYC.picture}
                alt="Profile picture"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-start mx-8">
              <p className="font-semibold text-xl">{user.KYC.name}</p>
              <p className="font-light text-lg">
                {new Date(user.KYC.dob.date).toDateString()}
              </p>
              <p className="font-light capitalize">{user.KYC.gender}</p>
            </div>
          </div>
          {user.isVerified ? <VerifiedBadge /> : null}
        </div>
      </div>
    </div>
  );
};

export default TravellerInfo;
