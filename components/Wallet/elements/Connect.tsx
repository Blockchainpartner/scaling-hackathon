import React from 'react';
import Box from "../../modules/Box";
import Button from '../../modules/Button';
import Image from "next/dist/client/image";

const Connect = () => {
  return (
    <Box>
      <span className={`flex items-center`}>
        <Image src={`/images/mm.png`} alt={"Metamask"} height={'30px'} width={'40px'}/>
        <p className={`ml-4`}>{"You'll need to connect your Metamask wallet to access Kiwi dApp features."}</p>
      </span>
      <div className={`mt-4`}>
        <Button handler={() => console.log("ahhh")}>
          Connect
        </Button>
      </div>
    </Box>
  );
};

export default Connect;