import React, {FC, ReactNode, SyntheticEvent} from 'react';

type Props = {
  children: ReactNode;
  handler: (e: SyntheticEvent) => void;
}

const Button: FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const {handler, children} = props;
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;