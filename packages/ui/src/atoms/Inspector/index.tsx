import type { TsxTargetedExp } from "@/types/helpers";
import * as React from "react";
import { cn } from "@/lib/cn";
import LoadingDots from "../LoadingDots";

/**
 * All the component types allowed by the Inspector component.
 */
export type InspectorComponentType =
  | "pre"
  | TsxTargetedExp<"code", "attribute">
  | React.JSXElementConstructor<
      React.DetailedHTMLProps<
        TsxTargetedExp<"pre", "attribute">,
        TsxTargetedExp<"code", "element">
      >
    >;

export interface InspectorProps<C extends InspectorComponentType = "pre"> {
  lang?: TsxTargetedExp<"pre", "attribute">["lang"];
  className?: TsxTargetedExp<"pre", "attribute">["className"];
  variant?: "blue" | "white" | "black";
  horizontalScrolling?: boolean;
  Component?: C;
  loading?: boolean;
}
/**
 * The HTML props allowed by the Inspector Component.
 */
export type InspectorHTMLType<C extends InspectorComponentType = "pre"> =
  C extends "pre"
    ? TsxTargetedExp<"pre", "attribute">
    : TsxTargetedExp<"i", "attribute">;

export type InspectorFC<C extends InspectorComponentType = "pre"> = React.FC<
  InspectorHTMLType<C> & InspectorProps<C>
>;

export type InspectorType = <C extends InspectorComponentType = "pre">(
  ...args: Parameters<InspectorFC<C>>
) => ReturnType<InspectorFC<C>>;

const Inspector: InspectorFC = ({
  variant = "black",
  loading = false,
  Component = "pre",
  horizontalScrolling = false,
  style = {},
  className,
  lang = "json",
  children,
  ...rest
}) => {
  return (
    <Component
      style={{ ...style }}
      data-variant={variant}
      className={cn(
        `ddui-relative ddui-flex ddui-items-center ddui-justify-center ddui-ring-1 ddui-ring-offset-[#facc15]`,
        `ddui-w-[90vw] ddui-min-w-fit ddui-bg-[#111010a8] ddui-text-[0.625rem] sm:ddui-text-[0.75rem] md:ddui-w-[80vw] xl:ddui-w-[72.5vw]`,
        `ddui-accent-[#ffffff9d] ddui-shadow-[0_0.3125rem_0.625rem_rgba(0,68,255,12%)] md:ddui-text-[0.875rem] xl:ddui-text-[1rem]`,
        `ddui-cursor-text ddui-select-auto ddui-rounded-[0.425rem] ddui-px-[0.875rem] ddui-py-0 ddui-font-light prose-code:ddui-text-stone-50`,
        `ddui-max-h-[100%] ddui-whitespace-pre-wrap ddui-break-words ddui-align-middle ddui-leading-[1.25rem] ddui-outline-none lg:ddui-overflow-x-auto`,
        `ddui-tracking-[0.023rem] ddui-transition-[border_0.2s_ease_0s,color_0.2s_ease_0s,background_0.2s_ease]`,
        [
          variant === "black"
            ? "hover:ddui-ring-2"
            : variant === "blue"
              ? "ddui-border-[0.0625rem] ddui-border-solid ddui-border-[rgb(240,241,242)] ddui-bg-[rgb(0,112,243)] ddui-text-[rgb(240,241,242)]"
              : variant === "white"
                ? "ddui-border-[0.0625rem] ddui-border-solid ddui-border-[rgb(36,37,38)] ddui-bg-[rgb(255,255,255)] ddui-text-[rgb(36,37,38)]"
                : ""
        ],
        [
          horizontalScrolling === true
            ? "ddui-overflow-x-scroll"
            : horizontalScrolling === false
              ? "ddui-overflow-x-hidden"
              : "ddui-overflow-x-auto"
        ],
        {
          [loading === true ? "ddui-bg-blend-darken ddui-transition-all" : ""]:
            loading
        },
        className ?? ""
      )}
      lang={lang ? lang : "json"}
      {...rest}>
      {loading ? (
        <i className={"ddui-m-0 ddui-flex"}>
          <LoadingDots />
        </i>
      ) : (
        children ?? <></>
      )}
    </Component>
  );
};

Inspector.displayName = "Inspector";

export default Inspector as InspectorType;
