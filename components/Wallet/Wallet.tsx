import React from 'react';
import Balance from "./elements/Balance";
import Connect from "./elements/Connect";

const Wallet = () => {
  return (
    <div className={`flex flex-col mt-8`}>
      <Balance/>
      <Connect/>
    </div>
  );
};

export default Wallet;