import React from 'react';
import {useSelector} from 'react-redux';
import Balance from "./elements/Balance";
import Connect from "./elements/Connect";
import {CustomState} from "../../store/store";

const Wallet = () => {
  const metamask = useSelector((state: CustomState) => state.metamask);
  const {init} = metamask;
  return (
    <div className={`flex flex-col mt-8`}>
      <Connect init={init}/>
      <Balance/>
    </div>
  );
};

export default Wallet;