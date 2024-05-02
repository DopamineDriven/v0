import type { TsxTargetedExp } from "@/types/helpers";
import * as React from "react";
import { cn } from "@/lib/cn";

const Input: React.FC<TsxTargetedExp<"input", "attribute">> = ({
  children,
  className,
  ...rest
}) => (
  <input
    className={cn(
      "ddui-block ddui-w-full ddui-bg-background ddui-text-foreground ddui-caret-foreground",
      "ddui-px-3 ddui-py-1 ddui-text-sm ddui-leading-7 ddui-transition-colors ddui-duration-200",
      "ddui-box-border ddui-appearance-none ddui-text-ellipsis ddui-rounded-md ddui-border ddui-border-solid ddui-border-accents-2 ddui-outline-0",
      "focus:ddui-border-red-700 active:ddui-border-azuki-maroon",
      className
    )}
    {...rest}>
    {children}
  </input>
);
Input.displayName = "Input";

export default Input;
