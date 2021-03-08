import React, {FC, useEffect, useState} from 'react';
import Box from "../../modules/Box";
import {CoinGeckoAPI} from '@coingecko/cg-api-ts';
import AssetBox from "../../modules/AssetBox";

const assets = [
  {
    id: 'eth',
    balance: 0.00434521,
    ticker: 'ETH'
  },
  {
    id: 'usdc',
    balance: 22.30,
    ticker: 'USDC'
  },
  {
    id: 'wbtc',
    balance: 0.000021,
    ticker: 'wBTC'
  },
  {
    id: 'other',
    balance: 0.00032312,
    ticker: 'Other ERC20'
  },
]

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
        <div className={`my-6 w-full flex flex-col`}>
          <div className={`mr-2 w-full`}>
            <Box>
              <p className={`text-md text-gray-500`}>{'Total Assets'}</p>
              <p className={`text-3xl`}>{(eurPrice as number).toFixed(2)} €</p>
              <p className={`text-sm font-light text-gray-900`}>{parseFloat(balance).toFixed(8)} ETH</p>
            </Box>
          </div>
          <div className={`ml-2 py-2 w-full grid grid-flow-col grid-cols-2 grid-rows-2 gap-4`}>
            {assets.map((asset) => (
              <AssetBox id={asset.id} balance={asset.balance} ticker={asset.ticker}/>
            ))}
          </div>
        </div>
      )}
    </>
  )
    ;
};

export default Balance;