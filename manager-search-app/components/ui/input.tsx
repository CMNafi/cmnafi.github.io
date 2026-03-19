import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground outline-none transition placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
      {...props}
    />
  );
});

