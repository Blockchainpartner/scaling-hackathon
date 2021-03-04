import React, {FC} from 'react';
import Box from "../../modules/Box";
import Button from '../../modules/Button';
import Image from "next/dist/client/image";
import MetaMaskOnboarding from '@metamask/onboarding';

type Props = {
  init: boolean;
}

const Connect: FC<Props> = ({init}) => {
  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding();

  //This will start the onboarding proccess
  const onClickInstall = () => {
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
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
        <Button handler={onClickConnect} disabled={!init}>
          Connect
        </Button>
      </div>
    </Box>
  );
};

export default Connect;