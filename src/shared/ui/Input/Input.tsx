import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputCustomProps = InputHTMLAttributes<HTMLInputElement> & {
   error?: boolean;
   helperText?: string;
   label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputCustomProps>((props, ref) => {
   const { error, helperText, label, ...otherProps } = props;

   return (
      <div>
         {label && <p className='text-gray-500 text-sm'>{label}</p>}
         <input
            {...otherProps}
            className={classNames(
               'flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full',
               { 'border-1 border-red-500 focus:ring-red-500': error },
               props.className,
            )}
            ref={ref}
         />
         {error && helperText && <p className='text-red-500 text-xs'>{helperText}</p>}
      </div>
   );
});
