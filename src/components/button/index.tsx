import * as React from "react";
import { Spinner } from "src/components";
import { cn } from "src/utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, className = "", ...props }: ButtonProps, ref) => {
    const classes = cn(
      className,
      "inline-flex items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
    );

    return (
      <button className={classes} ref={ref} {...props}>
        {isLoading && <Spinner className="text-current" />}
        <span className="mx-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
