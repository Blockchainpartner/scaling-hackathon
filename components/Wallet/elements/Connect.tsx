import React, {FC, useEffect, useState} from 'react';
import Box from "../../modules/Box";
import Button from '../../modules/Button';
import Image from "next/dist/client/image";
import MetaMaskOnboarding from '@metamask/onboarding';
import {isBrowser} from "../../../pages";

type Props = {
  init: boolean;
}

const Connect: FC<Props> = ({init}) => {
  const [onboarding, setOnboarding] = useState<any>(null);

  useEffect(() => {
    if(!isBrowser()){
      return;
    }
    //We create a new MetaMask onboarding object to use in our app
    const ob = new MetaMaskOnboarding();
    setOnboarding(ob);
  }, []);

  //This will start the onboarding proccess
  const onClickInstall = () => {
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      if (typeof window !== undefined) await window.ethereum.request({method: 'eth_requestAccounts'});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <span className={`flex items-center`}>
        <Image src={`/images/mm.png`} alt={"Metamask"} height={'30px'} width={'40px'}/>
        {init ? (
          <p className={`ml-4`}>
            You'll need to connect your Metamask wallet to access Kiwi dApp features.
          </p>
        ) : (
          <p className={`ml-4`}>
            You'll need to install the <a href="metamask.io">Metamask extension</a> or the <a href="brave.com">Brave
            browser</a> to use the dApp.
          </p>
        )}
      </span>
      <div className={`mt-4`}>
        <Button handler={init ? onClickConnect : onClickInstall} disabled={!init}>
          {init ? 'Connect' : 'Install Extension'}
        </Button>
      </div>
    </Box>
  );
};

export default Connect;