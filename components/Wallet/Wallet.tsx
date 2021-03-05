import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Balance from "./elements/Balance";
import Connect from "./elements/Connect";
import {CustomState} from "../../store/store";
import {isBrowser} from "../../pages";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";

const promisify = (inner: any) =>
  new Promise((resolve, reject) =>
    inner((err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );

const Wallet = () => {
  const metamask = useSelector((state: CustomState) => state.metamask);
  const {init} = metamask;
  const dispatch = useDispatch();

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
    if(accounts.length > 0 && typeof window !== undefined){
      (async function() {
        try {
          await getBalance();
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [accounts]);

  return (
    <div className={`flex flex-col mt-8`}>
      <Connect
        init={init}
        accounts={accounts}
        onClickConnect={onClickConnect}
        onClickInstall={onClickInstall}
      />
      <Balance balance={balance}/>
    </div>
  );
};

export default Wallet;