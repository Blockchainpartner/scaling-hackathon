import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import ScreenTitle from "../components/ScreenTitle";
import SidebarWrapper from "../components/SidebarWrapper";
import FireIcon from "../components/icons/HelpIcon";
import { UserId } from "../utils/types";
import VerifiedBadge from "../components/icons/VerifiedBadge";
import IdInfoItem from "../components/IdInfoItem";
import MockDoc from "../components/MockDoc";

const RANDOMUSER_URI = "https://randomuser.me/api/";

const userFetcher = () => axios.get(RANDOMUSER_URI).then((res) => res.data);

const revalOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const errorContent = () => (
  <div className="m-auto w-full">
    <FireIcon color="#17181C" />
    <p>An error occured while generating a random user... please refresh.</p>
  </div>
);

const loadingContent = () => (
  <div className="m-auto w-full">
    <FireIcon color="#17181C" />
    <p>Loading...</p>
  </div>
);

const Identity = () => {
  const { data, error } = useSWR("/api/user", userFetcher, revalOptions);
  const user = data?.results[0] as UserId;

  const [verified, ] = useState(false);

  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Identity Board"
        subTitle="You can manage your ID and KYC data through this board"
      />
      {error ? errorContent() : null}
      {!data ? loadingContent() : null}
      {data ? (
        <div>
          <div className="flex items-center xl:items-start flex-col xl:flex-row">
            <div className="board w-full mb-8 xl:mb-0 xl:w-3/5 relative">
              <div>
                <div className="flex items-baseline">
                  <p className="text-3xl">{`${user.name.first} ${user.name.last}`}</p>
                  <div className="px-2 py-0.5 rounded-3xl bg-brand text-xs text-white ml-4">
                    individual
                  </div>
                </div>
                <code className="text-md">{`0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce`}</code>

                {verified ? (
                  <div className="absolute top-4 right-4">
                    <VerifiedBadge />
                  </div>
                ) : null}

                <div className="mt-10">
                  <IdInfoItem label="Title" info={user.name.title} />
                  <IdInfoItem label="First name" info={user.name.first} />
                  <IdInfoItem label="Last name" info={user.name.last} />
                  <IdInfoItem
                    label="Date of birth"
                    info={new Date(user.dob.date).toDateString()}
                  />
                  <IdInfoItem label="Nationality" info={user.nat} />
                  <IdInfoItem label="Gender" info={user.gender} />
                  <IdInfoItem label="Mobile" info={user.phone} />
                  <IdInfoItem label="Email" info={user.email} />
                  <IdInfoItem
                    label="Address"
                    info={`${user.location.street.number}, ${user.location.street.name}`}
                  />
                  <IdInfoItem label="Postcode" info={user.location.postcode} />
                  <IdInfoItem
                    label="City, State"
                    info={`${user.location.city}, ${user.location.state}`}
                  />
                  <IdInfoItem label="Country" info={user.location.country} />
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-between w-full xl:w-min xl:ml-8">
              <div className="board h-5/6">
                <p className="text-2xl mb-4">Files and documents</p>
                <MockDoc filename="passport.pdf" size="2.1Mb"/>
                <MockDoc filename="disabilty_certificate.pdf" size="4.3Mb"/>
                <MockDoc filename="IdCard.png" size="0.4Mb"/>
              </div>
              <button className="btn-primary mt-8 py-6 w-full">SAVE IDENTITY INFO</button>
            </div>
          </div>
        </div>
      ) : null}
    </SidebarWrapper>
  );
};

export default Identity;
