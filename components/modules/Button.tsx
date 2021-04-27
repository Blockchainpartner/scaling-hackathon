import React, {FC, ReactNode, SyntheticEvent} from 'react';

type Props = {
  children: ReactNode;
  handler: (e: SyntheticEvent) => void;
  disabled?: boolean;
}

const Button: FC<Props> = ({children, handler, disabled}) => {
  return (
    <button
      className={`disabled:cursor-not-allowed disabled:opacity-50 bg-green-500 ${!disabled && 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}
      onClick={handler}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};

export default Button;