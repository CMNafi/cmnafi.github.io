import * as React from "react";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-white/20 bg-transparent accent-[rgb(214,153,92)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
      {...props}
    />
  );
});

