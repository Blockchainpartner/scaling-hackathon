import React, {FC} from 'react';
import Box from "../../modules/Box";

type Props = {
  balance: string;
}

const Balance: FC<Props> = ({balance}) => {
  return (
    <Box>
      <p>{`Your balance is `} <code className={`font-medium bg-green-100`}>{`${balance.length > 0 ? balance : 'not available.'}`}</code></p>
    </Box>
  );
};

export default Balance;