import type { TsxTargeted, TsxTargetedExp } from "@/types/helpers";
import * as React from "react";
import { cn } from "@/lib/cn";
import LoadingDots from "../LoadingDots";

/**
 * All the component types allowed by the Code component.
 */
export type CodeComponentType =
  | "code"
  | React.JSXElementConstructor<
      React.DetailedHTMLProps<
        TsxTargetedExp<"code", "attribute">,
        TsxTargetedExp<"code", "element">
      >
    >;

export interface CodeProps<C extends CodeComponentType = "code"> {
  lang?: TsxTargetedExp<"code", "attribute">["lang"];
  className?: TsxTargetedExp<"code", "attribute">["className"];
  variant?: "blue" | "white" | "black";
  horizontalScrolling?: boolean;
  Component?: C;
  loading?: boolean;
}
/**
 * The HTML props allowed by the Code Component.
 */
export type CodeHTMLType<C extends CodeComponentType = "code"> =
  C extends "code" ? TsxTargeted<"code"> : TsxTargeted<"i">;

export type CodeFC<C extends CodeComponentType = "code"> = React.FC<
  CodeHTMLType<C> & CodeProps<C>
>;

export type CodeType = <C extends CodeComponentType = "code">(
  ...args: Parameters<CodeFC<C>>
) => ReturnType<CodeFC<C>>;

const Code: CodeFC = ({
  variant = "black",
  loading = false,
  Component = "code",
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
      lang={lang ? lang : "ts"}
      className={cn(
        'before:ddui-content-["`"] after:ddui-content-["`"]',
        `ddui-whitespace-pre-wrap ddui-text-base ddui-text-code ddui-ring-1 ddui-ring-offset-[#facc15]`,
        `ddui-w-[90vw] ddui-min-w-fit ddui-bg-[#111010a8] ddui-text-[0.75rem] sm:ddui-text-[0.625rem] md:ddui-w-[80vw] xl:ddui-w-[72.5vw]`,
        `ddui-accent-[#ffffff9d] ddui-shadow-[0_0.3125rem_0.625rem_rgba(0,68,255,12%)] md:ddui-text-[0.875rem] xl:ddui-text-[1rem]`,
        `ddui-cursor-text ddui-select-auto ddui-rounded-[0.425rem] ddui-px-[0.875rem] ddui-py-0 ddui-font-light`,
        `ddui-max-h-[100%] ddui-break-words ddui-align-middle ddui-leading-[1.25rem] ddui-outline-none lg:ddui-overflow-x-auto`,
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

Code.displayName = "Code";
export default Code as CodeType;
