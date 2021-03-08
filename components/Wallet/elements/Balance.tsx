import React, {FC, useEffect, useState} from 'react';
import Box from "../../modules/Box";
import {CoinGeckoAPI} from '@coingecko/cg-api-ts';

type Props = {
  balance: string;
}

const Balance: FC<Props> = ({balance}) => {

  const [eurPrice, setEurPrice] = useState<number | undefined>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const fetch = window.fetch.bind(window);
      const cg = new CoinGeckoAPI(fetch);

      cg.getSimplePrice(["ethereum"], ["eur"]).then((res) => {
        if (res) {
          setEurPrice(parseFloat(balance) * (res.data.ethereum.eur as number));
          console.log(res);
        } else {
          console.error("GC server not responding properly");
        }
      });
    }
  }, [balance]);

  return (
    <>
      {!
        balance.length ? (
        <p className={`font-light mt-12`}>{`Your balance is not available yet.`}</p>
      ) : (
        <div className={`w-full flex`}>
          <div className={`mr-2 w-1/2`}>
            <Box>
              <p className={`text-md text-gray-500`}>{'Total Assets'}</p>
              <p className={`text-3xl`}>{(eurPrice as number).toFixed(2)} €</p>
              <p className={`text-sm font-light text-gray-900`}>{parseFloat(balance).toFixed(8)} ETH</p>
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