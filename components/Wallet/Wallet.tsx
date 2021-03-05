import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Balance from "./elements/Balance";
import Connect from "./elements/Connect";
import {CustomState} from "../../store/store";
import {isBrowser} from "../../pages";
import MetaMaskOnboarding from "@metamask/onboarding";

const Wallet = () => {
  const metamask = useSelector((state: CustomState) => state.metamask);
  const {init} = metamask;
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);
  const [onboarding, setOnboarding] = useState<any>(null);

  const checkAccounts = async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    if (typeof window !== undefined) {
      const mmAccounts = await window.ethereum.request({method: 'eth_accounts'});
      setAccounts(mmAccounts);
      dispatch({
        type: 'SET_ACCOUNTS',
        payload: {
          accounts: mmAccounts,
        },
      })
    } else {
      setAccounts(await []);
    }
  };

  //This will start the onboarding proccess
  const onClickInstall = () => {
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      if (typeof window !== undefined) await window.ethereum.request({method: 'eth_requestAccounts'});
      await checkAccounts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    //We create a new MetaMask onboarding object to use in our app
    const ob = new MetaMaskOnboarding();
    setOnboarding(ob);
  }, []);

  return (
    <div className={`flex flex-col mt-8`}>
      <Connect
        init={init}
        accounts={accounts}
        onClickConnect={onClickConnect}
        onClickInstall={onClickInstall}
      />
      <Balance/>
    </div>
  );
};

export default Wallet;