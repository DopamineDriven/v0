import type { TsxTargetedExp } from "@/types/helpers";
import * as React from "react";

export const loadingDotStyles = {
  dot: `ddui-rounded-full ddui-h-2 ddui-w-2 ddui-mx-0.5 ddui-bg-current motion-safe:ddui-animate-[blink_1s_ease_0s_infinite_normal_both]`
} as const;

const LoadingDots: React.FC<TsxTargetedExp<"span", "attribute">> = ({
  ...props
}) => {
  const { dot } = loadingDotStyles;
  return (
    <span
      className={
        "ddui-inline-flex ddui-items-center ddui-text-center ddui-leading-7"
      }
      {...props}>
      <span className={dot} key="dot_1'" />
      <span className={dot} style={{ animationDelay: "0.2s" }} key='dot_2' />
      <span className={dot} style={{ animationDelay: "0.2s" }} key='dot_3' />
    </span>
  );
};

LoadingDots.displayName = "LoadingDots";

export default LoadingDots;
