import { Ref, TextareaHTMLAttributes, forwardRef } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef(
  ({ ...rest }: IProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        className="border resize-none border-gray-300 w-full mx-auto outline-none px-3 py-3 shadow-lg rounded-md transition-all duration-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        rows={6}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Textarea;
