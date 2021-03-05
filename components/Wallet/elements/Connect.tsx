import React, {FC} from 'react';
import Box from "../../modules/Box";
import Button from '../../modules/Button';
import Image from "next/dist/client/image";

type Props = {
  init: boolean;
  accounts: string[];
  onClickConnect: () => void;
  onClickInstall: () => void;
}

const Connect: FC<Props> = ({init, accounts, onClickConnect, onClickInstall}) => {
  return (
    <Box>
      {accounts.length > 0 ? (
        <>
          <span className={`flex items-center`}>
            <p>Your account: </p>
            <code className={`bg-green-100`}>{accounts[0]}</code>
          </span>
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Connect;