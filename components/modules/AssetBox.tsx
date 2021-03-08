import React, {FC} from 'react';
import Image from "next/dist/client/image";

type Props = {
  id: string;
  balance: number;
  ticker: string;
}

const AssetBox: FC<Props> = ({id, balance, ticker}) => {
  return (
    <div className={`p-4 flex bg-white border border-green-300 rounded-md hover:bg-green-100 items-center`}>
      <div className={'rounded-full border border-gray-500 w-10 h-10 p-1 bg-white'}>
        <Image src={`/images/${id}.png`} alt={"ETH"} objectFit="contain" height={'100%'} width={'100%'}/>
      </div>
      <div className={`ml-4 flex flex-col items-start`}>
        <p className={`text-lg`}>{balance}</p>
        <p className={`text-sm font-light`}>{ticker}</p>
      </div>
    </div>
  );
};

export default AssetBox;