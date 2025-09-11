import { cn } from "../../utils/cn";
import * as React from "react";
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm",
        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
});
