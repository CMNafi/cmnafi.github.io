import * as React from "react";

import { cn } from "@/lib/utils";

export const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Command(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("overflow-hidden rounded-3xl border border-white/10 bg-black/20", className)} {...props} />;
});

export const CommandInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function CommandInput(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-14 w-full border-b border-white/10 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-stone-400",
        className
      )}
      {...props}
    />
  );
});

export const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CommandList(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("max-h-80 overflow-y-auto p-2", className)} {...props} />;
});

export function CommandEmpty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-3 py-8 text-center text-sm text-stone-400", className)} {...props} />;
}

export function CommandGroup({ className, heading, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {heading ? <p className="px-3 pb-1 pt-2 text-xs uppercase tracking-[0.24em] text-stone-500">{heading}</p> : null}
      {children}
    </div>
  );
}

export interface CommandItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const CommandItem = React.forwardRef<HTMLButtonElement, CommandItemProps>(function CommandItem(
  { className, selected = false, type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex w-full items-start justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        selected && "bg-white/8",
        className
      )}
      {...props}
    />
  );
});

