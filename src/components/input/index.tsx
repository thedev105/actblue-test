import * as React from "react";
import { cn } from "src/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endIcon?: React.ReactNode;
}

export const Input = (props: InputProps) => {
  const { endIcon, className = "", ...rest } = props;
  const classes = cn(
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
    className
  );

  return (
    <div className="relative">
      <input className={classes} {...rest} />
      {endIcon && (
        <div className="absolute inset-y-0 right-2 top-0 flex items-center ps-3.5 pointer-events-none">
          {endIcon}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";
