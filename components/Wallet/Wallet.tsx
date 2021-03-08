import React, {FC} from 'react';

import {useSelector} from "react-redux";
import {CustomState} from "../../store/store";
import Button from "../modules/Button";

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
        <span className={`flex items-center`}>
          <p>Your account: </p>
          <code className={`bg-green-100`}>{accounts[0]}</code>
        </span>
      )}
    </div>
  );
};

export default Wallet;