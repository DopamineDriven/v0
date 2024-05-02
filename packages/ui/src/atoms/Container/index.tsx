import type { TsxTargetedExp } from "@/types/helpers";
import * as React from "react";
import { cn } from "@/lib/cn";
import LoadingDots from "../LoadingDots";

export type DivComponentType =
  | "div"
  | TsxTargetedExp<"div", "attribute">
  | React.JSXElementConstructor<
      React.DetailedHTMLProps<
        TsxTargetedExp<"div", "attribute">,
        TsxTargetedExp<"div", "element">
      >
    >;

export interface DivContainerProps<C extends DivComponentType = "div"> {
  lang?: string;
  className?: string;
  clean?: boolean;
  El?: C;
  children?: React.ReactNode;
  loading?: boolean;
}

export type ContainerHTMLType<C extends DivComponentType = "div"> =
  C extends "div"
    ? TsxTargetedExp<"div", "attribute">
    : TsxTargetedExp<"i", "attribute">;

export type ContainerFC<C extends DivComponentType = "div"> = React.FC<
  ContainerHTMLType<C> & DivContainerProps<C>
>;

export type ContainerType = <C extends DivComponentType = "div">(
  ...args: Parameters<ContainerFC<C>>
) => ReturnType<ContainerFC<C>>;

const Container: ContainerFC = ({
  children,
  El = "div",
  clean,
  className,
  style = {},
  loading = false,
  ...rest
}) => {
  return (
    <El
      style={{ ...style }}
      className={cn(className, `ddui-container ddui-mx-auto`, {
        "ddui-max-w-[auto]": !clean,
        "": clean
      })}
      {...rest}>
      {loading ? (
        <i className={"ddui-m-0 ddui-flex"}>
          <LoadingDots />
        </i>
      ) : (
        children ?? <></>
      )}
    </El>
  );
};

Container.displayName = "Container";

export default Container as ContainerType;
