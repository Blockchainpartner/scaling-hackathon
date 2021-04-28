import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { UserId } from "../utils/types";
import VerifiedBadge from "./icons/VerifiedBadge";

const RANDOMUSER_URI = "https://randomuser.me/api/";

const userFetcher = () => axios.get(RANDOMUSER_URI).then((res) => res.data);

const revalOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const TravellerInfo = () => {
  //TODO: Remove on integration
  const { data, error } = useSWR("/api/user", userFetcher, revalOptions);
  const user = data?.results[0] as UserId;
  const [verified] = useState(true);

  return (
    <div className="flex flex-col items-start mt-8">
      <p className="font-semibold text-2xl text-lDark">Traveller info</p>
      <div className="board mt-4">
        {/* TOTO: Integrate real user data */}
        {error ? "An error occured" : null}
        {!data ? "Loading..." : null}
        {data ? (
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div>
                <img
                  src={user.picture.thumbnail}
                  alt="Profile picture"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start mx-8">
                <p className="font-semibold text-xl">{`${user.name.first} ${user.name.last}`}</p>
                <p className="font-light text-lg">
                  {new Date(user.dob.date).toDateString()}
                </p>
                <p className="font-light capitalize">
                  {user.gender}
                </p>
              </div>
            </div>
            {verified ? <VerifiedBadge /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TravellerInfo;
