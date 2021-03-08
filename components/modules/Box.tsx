import React, {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
}

const Box: FC<Props> = ({children}) => {
  return (
    <div className={`my-5 p-8 w-full bg-gray-100 rounded-md`}>
      {children}
    </div>
  );
};

export default Box;