import * as React from "react";
import type { TsxTargetedExp } from "@/types/helpers";
import { cn } from "@/lib/cn";
import LoadingDots from "../LoadingDots";

/**
 * All the component types allowed by the Button component.
 */

// type ButtonAnchor = {
//   a: TsxTargetedExp<"a", "attribute">;
//   b: TsxTargetedExp<"button", "attribute">;
// }

export type ButtonComponentType =
  | "button"
  | "a"
  | React.JSXElementConstructor<
      React.DetailedHTMLProps<
        TsxTargetedExp<"button", "attribute">,
        TsxTargetedExp<"button", "element">
      >
    >
  | React.JSXElementConstructor<
      React.DetailedHTMLProps<
        TsxTargetedExp<"a", "attribute">,
        TsxTargetedExp<"a", "element">
      >
    >;

/**
 * Base props of the Button component.
 */
export interface ButtonProps<C extends ButtonComponentType = "button"> {
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "violet" | "black" | "white";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: C;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * The HTML props allowed by the Button component. These
 * props depend on the used component type (C).
 */
export type ButtonHTMLType<C extends ButtonComponentType = "button"> =
  C extends "a"
    ? TsxTargetedExp<"a", "attribute">
    : TsxTargetedExp<"button", "attribute">;

export type ButtonFC<C extends ButtonComponentType = "button"> = React.FC<
  ButtonHTMLType<C> & ButtonProps<C>
>;

export type ButtonType = <C extends ButtonComponentType = "button">(
  ...args: Parameters<ButtonFC<C>>
) => ReturnType<ButtonFC<C>>;

export const variants = {
  primary:
    "ddui-text-background ddui-bg-success ddui-border-success-dark hover:ddui-bg-success/90 ddui-shadow-[0_5px_10px_rgb(0,68,255,0.12)]",
  ghost: "ddui-text-success hover:ddui-bg-[rgba(0,68,255,0.06)]",
  secondary:
    "ddui-text-accents-5 ddui-bg-background ddui-border-accents-2 hover:ddui-border-foreground hover:ddui-text-foreground",
  black:
    "ddui-bg-foreground ddui-text-background ddui-border-foreground hover:ddui-bg-background hover:ddui-text-foreground",
  white:
    "ddui-bg-background ddui-text-foreground ddui-border-background hover:ddui-bg-accents-1",
  violet:
    "ddui-text-background ddui-bg-violet ddui-border-violet-dark hover:ddui-bg-[#7123be]"
} as const;

const variantSizes = {
  sm: "ddui-h-8 ddui-leading-3 ddui-text-sm ddui-px-1.5 ddui-py-3",
  md: "ddui-h-10 ddui-leading-10 ddui-text-[0.9375rem]",
  lg: "ddui-h-12 ddui-leading-[3rem] ddui-text-[1.0625rem]"
} as const;

const sizes = variantSizes;

const Button: ButtonFC = ({
  width,
  active,
  children,
  variant = "primary",
  Component = "button",
  loading = false,
  style = {},
  disabled,
  size = "md",
  className,
  ...rest
}) => {
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      className={cn(
        "ddui-relative ddui-inline-flex ddui-cursor-pointer ddui-items-center ddui-justify-center ddui-rounded-md ddui-px-3.5 ddui-no-underline",
        "ddui-select-none ddui-whitespace-nowrap ddui-align-middle ddui-font-medium ddui-outline-0",
        "ddui-transition-colors ddui-duration-200 ddui-ease-in",
        variant !== "ghost" && "ddui-border ddui-border-solid",
        variants[variant],
        sizes[size],
        { "cursor-not-allowed": loading },
        className
      )}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}>
      {loading ? (
        <i className='ddui-m-0 ddui-flex'>
          <LoadingDots />
        </i>
      ) : (
        children
      )}
    </Component>
  );
};
Button.displayName = "Button";
// Button component built thinking of it as a button not a link
// but it can also be used as a link and include the anchor props
export default Button as ButtonType;
