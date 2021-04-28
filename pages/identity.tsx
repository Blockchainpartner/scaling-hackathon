import React from "react";
import axios from "axios";
import useSWR from "swr";
import ScreenTitle from "../components/ScreenTitle/ScreenTitle";
import SidebarWrapper from "../components/Sidebar/SidebarWrapper";
import FireIcon from "../components/icons/FireIcon";
import { UserId } from "../utils/types";

const RANDOMUSER_URI = "https://randomuser.me/api/";

const userFetcher = () => axios.get(RANDOMUSER_URI).then((res) => res.data);

const revalOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const errorContent = () => (
  <div className="m-auto w-full">
    <FireIcon color="#17181C" />
    <p>An error occured while generating a random user...</p>
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
  console.log(data);
  const user = data?.results[0] as UserId;
  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Identity Board"
        subTitle="You can manage your ID and KYC data through this board"
      />
      <div className="board w-3/5">
        {error ? errorContent() : null}
        {!data ? loadingContent() : null}
        {data ? (
          <div>
            <div className="flex items-baseline">
              <p className="text-3xl">{`${user.name.first} ${user.name.last}`}</p>
              <div className="px-2 py-0.5 rounded-3xl bg-brand text-xs text-white ml-4">
                individual
              </div>
            </div>
            <code className="text-md">{`0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce`}</code>

            <div className="mt-10">
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Title`}</p>
                <p className="text-lg text-left">{user.name.title}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`First name`}</p>
                <p className="text-lg text-left">{user.name.first}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Last name`}</p>
                <p className="text-lg text-left">{user.name.last}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Date of birth`}</p>
                <p className="text-lg text-left">
                  {new Date(user.dob.date).toDateString()}
                </p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Nationality`}</p>
                <p className="text-lg text-left">{user.nat}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Gender`}</p>
                <p className="text-lg text-left capitalize">{user.gender}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Mobile`}</p>
                <p className="text-lg text-left">{user.phone}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Email`}</p>
                <p className="text-lg text-left">{user.email}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Address`}</p>
                <p className="text-lg text-left">{`${user.location.street.number}, ${user.location.street.name}`}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Postcode`}</p>
                <p className="text-lg text-left">{user.location.postcode}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`City, State`}</p>
                <p className="text-lg text-left">{`${user.location.city}, ${user.location.state}`}</p>
              </div>
              <div className="flex items-baseline mb-3">
                <p className="text-lg font-light w-1/3">{`Country`}</p>
                <p className="text-lg text-left">{user.location.country}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SidebarWrapper>
  );
};

export default Identity;
