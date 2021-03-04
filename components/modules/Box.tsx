import React, {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
}

const Box: FC<Props> = ({children}) => {
  return (
    <div className={`my-5 p-10 border-2 border-black rounded-md`}>
      {children}
    </div>
  );
};

export default Box;