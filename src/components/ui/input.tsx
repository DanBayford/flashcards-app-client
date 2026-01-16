import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-md px-3 py-1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-900 focus:shadow-[2px_2px_0px_rgba(80,114,199,1)]",
        "aria-invalid:border-pink-700 aria-invalid:shadow-[2px_2px_0px_rgba(225,25,102,1)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
