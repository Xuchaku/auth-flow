import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonCustomProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   loading?: boolean;
};

export const Button = (props: ButtonCustomProps) => {
   const { loading, ...otherProps } = props;
   return (
      <button
         {...otherProps}
         className={classNames(
            'px-2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-auto',
            {
               'bg-neutral-300 hover:bg-neutral-300 focus:ring-neutral-300': props.disabled,
            },
            otherProps.className,
         )}
      >
         {props.children}
      </button>
   );
};
