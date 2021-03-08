import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import Wallet from '../components/Wallet/Wallet';
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/modules/Header";
import Balance from "../components/Wallet/elements/Balance";
import {CustomState} from "../store/store";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import {promisify} from '../utils/utils';
import Connect from "../components/Wallet/elements/Connect";

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

export const isBrowser = () => typeof window !== "undefined";

const IndexPage = () => {
  const dispatch = useDispatch();

  const metamask = useSelector((state: CustomState) => state.metamask);
  const {init} = metamask;

  const [accounts, setAccounts] = useState([]);
  const [onboarding, setOnboarding] = useState<any>(null);
  const [balance, setBalance] = useState('');

  const web3 = new Web3(Web3.givenProvider);

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
      });
      await getBalance();
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

  const getBalance = async () => {
    let address: any, wei, mmBalance;
    address = accounts[0];
    wei = promisify((cb: any) => web3.eth.getBalance(address, cb));
    try {
      mmBalance = web3.utils.fromWei(await wei as string, 'ether');
      setBalance(mmBalance);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    if (accounts.length > 0 && typeof window !== undefined) {
      (async function () {
        try {
          await getBalance();
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [accounts]);

  useEffect(() => {
      if (!isBrowser) {
        return;
      }
      window.web3 = window.web3 || {};
      window.ethereum = window.ethereum || {};

      //Check function to see if the MetaMask extension is installed
      const isMetamaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const {ethereum} = window;
        return Boolean(ethereum && ethereum.isMetaMask);
      };

      const init = isMetamaskInstalled();

      if (init) {
        dispatch({
          type: 'SET_MM_INIT',
          payload: {
            init,
          },
        })
      }
    }, []
  )
  ;

  return (
    <div className={`w-1/2 flex flex-col items-center content-center m-auto text-center mt-20`}>
      <Header accounts={accounts} onClickConnect={onClickConnect} onClickInstall={onClickInstall}/>
      {!accounts.length && <Connect init={init} onClickConnect={onClickConnect} onClickInstall={onClickInstall}/>}
      <Balance balance={balance}/>
    </div>
  );
}

export default IndexPage
