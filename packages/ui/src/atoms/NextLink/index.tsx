import type { TsxTargetedExp } from "@/types/helpers";
import type { LinkPropsInferred } from "@/types/next";
import NextLink from "next/link";
import cn from "clsx";

// type M<T> = T extends `https://${string}` ? TsxTargetedExp<"a", "attribute"> : LinkPropsInferred;

// type GetHref = LinkPropsInferred['href']

const DduiLink = ({
  ...props
}: LinkPropsInferred | TsxTargetedExp<"a", "attribute">) => {
  if (
    props.href != null &&
    /(https?):\/\//g.test(
      typeof props?.href === "string" ? props.href : props.href?.href ?? ""
    ) === false
  ) {
    return (
      <NextLink
        href={props.href}
        className={cn(
          "ddui-text-gray-800 ddui-no-underline ddui-transition-colors hover:ddui-text-gray-700",
          props.className
        )}>
        {props.children}
      </NextLink>
    );
  } else {
    const { href, ...rest } = props;
    const h =
      typeof href !== "undefined"
        ? typeof href === "object"
          ? href?.href === null
            ? undefined
            : href?.href
          : href
        : href;
    const propsExtended = { href: h, ...rest };

    return (
      <a
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          "ddui-inline-block ddui-align-middle ddui-font-medium ddui-text-link hover:ddui-text-link-light hover:ddui-underline",
          propsExtended.className
        )}
        {...propsExtended}>
        {propsExtended.children}
      </a>
    );
  }
};

DduiLink.displayName = "DduiLink";

export default DduiLink;
