import React, {FC} from 'react';
import Box from "../../modules/Box";
import Image from "next/dist/client/image";

type Props = {
  init: boolean;
  onClickConnect: () => void;
  onClickInstall: () => void;
}

const Connect: FC<Props> = ({init}) => {
  return (
    <Box>
      <>
        <span className={`flex items-center`}>
          <Image src={`/images/mm.png`} alt={"Metamask"} height={'30px'} width={'40px'}/>
          {init ? (
            <p className={`ml-4 text-left`}>
              You'll need to connect your Metamask wallet to access Kiwi dApp features.
            </p>
          ) : (
            <p className={`ml-4 text-left`}>
              You'll need to install the <a href="metamask.io">Metamask extension</a> or the <a href="brave.com">Brave
              browser</a> to use the dApp.
            </p>
          )}
        </span>
      </>
    </Box>
  );
};

export default Connect;