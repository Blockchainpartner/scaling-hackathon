import React, {FC} from 'react';
import Box from "../../modules/Box";

type Props = {
  balance: string;
}

const Balance: FC<Props> = ({balance}) => {
  return (
    <>
      {!
        balance.length ? (
        <p className={`font-light mt-12`}>{`Your balance is not available yet.`}</p>
      ) : (
        <div className={`w-full flex`}>
          <div className={`mr-2 w-1/2`}>
            <Box>
              {parseInt(balance).toFixed(6) + ' ETH'}
            </Box>
          </div>
          <div className={`ml-2 w-1/2`}>
            <Box>
              aa
            </Box>
          </div>
        </div>
      )}
    </>
  )
    ;
};

export default Balance;