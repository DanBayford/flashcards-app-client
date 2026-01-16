import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border border-input placeholder:text-muted-foreground aria-invalid:border-destructive flex field-sizing-content min-h-16 max-h-40 w-full rounded-md bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-900 focus:shadow-[2px_2px_0px_rgba(80,114,199,1)]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
