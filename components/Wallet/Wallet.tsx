import React, {FC} from 'react';

import {useSelector} from "react-redux";
import {CustomState} from "../../store/store";
import Button from "../modules/Button";
import {atFormat} from "../../utils/utils";

type Props = {
  accounts: string[];
  onClickConnect: () => void;
  onClickInstall: () => void;
}

const Wallet: FC<Props> = ({accounts, onClickConnect, onClickInstall}) => {
  const metamask = useSelector((state: CustomState) => state.metamask);
  const {init} = metamask;

  return (
    <div>
      {!accounts.length ? (
        <Button handler={init ? onClickConnect : onClickInstall} disabled={!init}>
          {init ? 'Connect' : 'Install Extension'}
        </Button>
      ) : (
        <div className={`flex py-4 px-6 rounded hover:bg-gray-100 hover:cursor-pointer`}>
          <span className={`flex items-center mr-4`}>
            <p className={`font-medium hover:underline`}>{atFormat(accounts[0], 5)}</p>
          </span>
          <img src={`https://api.multiavatar.com/${accounts[0]}.png`} alt={"Kiwi"} width={'35px'}/>
        </div>
      )}
    </div>
  );
};

export default Wallet;