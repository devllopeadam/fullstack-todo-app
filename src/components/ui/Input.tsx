import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border border-gray-300 w-full mx-auto outline-none px-3 py-3 shadow-lg rounded-md transition-all duration-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
      {...rest}
    />
  );
});

export default Input;
