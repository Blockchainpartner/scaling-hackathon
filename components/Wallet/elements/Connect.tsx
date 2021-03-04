import React from 'react';
import Box from "../../modules/Box";
import Button from '../../modules/Button';

const Connect = () => {
  return (
    <Box>
      <Button handler={() => console.log("ahhh")}>
        Connect
      </Button>
    </Box>
  );
};

export default Connect;