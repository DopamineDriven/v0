import type { TsxTargetedExp } from "@/types/helpers";
import type { LinkPropsInferred } from "@/types/next";
import * as React from "react";
import { cn } from "@/lib/cn";

export type TextProps = {
  variant: Variant;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  html?: string;
};

export const VariantObj = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  body: "body",
  blockquote: "blockquote",
  details: "details",
  section: "section",
  small: "small",
  sub: "sub",
  sup: "sup",
  caption: "caption",
  aside: "aside"
} as const;

export type Variant = keyof typeof VariantObj;

export const variants = {
  h1: "ddui-text-5xl ddui-tracking-tight",
  h2: "ddui-text-4xl ddui-tracking-tight",
  h3: "ddui-text-3xl ddui-tracking-normal",
  h4: "ddui-text-2xl",
  h5: "ddui-text-xl",
  h6: "ddui-text-xl",
  details: "ddui-text-lg ddui-tracking-tight ddui-text-accents-5",
  p: "ddui-text-base",
  body: "ddui-mx-auto",
  blockquote: "ddui-font-light ddui-tracking-wide",
  section: "ddui-mx-auto",
  small:
    "ddui-text-sm ddui-font-semibold ddui-text-blue ddui-uppercase ddui-tracking-tight ddui-pl-1 ddui-block",
  sub: "",
  sup: "",
  caption: "",
  aside: ""
} as const;

export type ComponentsMapSatisfies = {
  readonly [P in Variant]:
    | React.ComponentType<
        | TsxTargetedExp<(typeof VariantObj)[P], "attribute">
        | `${(typeof VariantObj)[P]}`
      >
    | P
    | React.ForwardRefExoticComponent<
        Omit<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          keyof LinkPropsInferred
        > &
          LinkPropsInferred & {
            children?: React.ReactNode;
          } & React.RefAttributes<HTMLAnchorElement>
      >;
};

export type ComponentsMapSatisfiesMapped = {
  [Z in keyof ComponentsMapSatisfies]: ComponentsMapSatisfies[Z];
};

const Text: React.FC<TextProps> = ({
  style,
  className = "",
  variant,
  children
}) => {
  const componentsMap = {
    aside: VariantObj.aside,
    blockquote: VariantObj.blockquote,
    body: VariantObj.body,
    caption: VariantObj.caption,
    details: VariantObj.details,
    h1: VariantObj.h1,
    h2: VariantObj.h2,
    h3: VariantObj.h3,
    h4: VariantObj.h4,
    h5: VariantObj.h5,
    h6: VariantObj.h6,
    p: VariantObj.p,
    section: VariantObj.section,
    small: VariantObj.small,
    sub: VariantObj.sub,
    sup: VariantObj.sup
  } as const satisfies {
    readonly [P in Variant]: ComponentsMapSatisfiesMapped[P];
  };

  const Component = componentsMap[variant] satisfies
    | (typeof componentsMap)[typeof variant]
    | React.ComponentType<
        | TsxTargetedExp<(typeof VariantObj)[typeof variant], "attribute">
        | (typeof componentsMap)[typeof variant]
      >;
  return (
    <Component className={cn(variants[variant], className)} style={style}>
      {children}
    </Component>
  );
};
Text.displayName = "Text";
export default Text;
