"use client";

import * as React from "react";
import type { TsxTargetedExp } from "@/types/helpers";
import { cn } from "@/lib/cn";

const Snippet: React.FC<TsxTargetedExp<"pre", "attribute">> = ({
  children,
  className,
  ...props
}) => {
  const __html = React.useMemo(
    () =>
      children
        ? typeof children === "string"
          ? children
          : JSON.stringify(children)
        : "",
    [children]
  );
  return (
    <pre
      className={cn(
        "ddui-overflow-x-auto ddui-rounded-md ddui-border ddui-border-accents-2 ddui-bg-accents-1 ddui-p-6",
        className ? className : ""
      )}
      {...props}>
      <code dangerouslySetInnerHTML={{ __html }} />
    </pre>
  );
};

Snippet.displayName = "Snippet";

export default Snippet;
