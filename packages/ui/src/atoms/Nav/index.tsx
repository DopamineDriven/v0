import type { TsxTargetedExp } from "@/types/helpers";
import * as React from "react";
import { cn } from "@/lib/cn";

import type { DeployButtonProps } from "../DeployButton";
import Button from "../Buttons";
import DeployButton from "../DeployButton";
import DduiLink from "../NextLink";

const REPO_URL = "https://github.com/DopamineDriven/v0/tree/master" as const;

export interface NavProps extends TsxTargetedExp<"nav", "attribute"> {
  path: string;
  deployButton?: Partial<DeployButtonProps>;
  variant?: "primary" | "secondary" | "ghost" | "violet" | "black" | "white";
  logo?: React.ReactNode;
}

function Nav({
  path,
  deployButton,
  variant,
  className,
  logo,
  ...rest
}: NavProps) {
  const displayPath = ["dopamine driven"]
    .concat(path?.split("/").filter(Boolean) || [])
    .join(" / ");
  const repositoryUrl = deployButton?.repositoryUrl
    ? deployButton.repositoryUrl
    : (`${REPO_URL}/${path}` as const);

  return (
    <nav
      className={cn(
        "ddui-relative ddui-z-20 ddui-border-b ddui-border-gray-200 ddui-bg-background ddui-py-5 ddui-shadow-[0_0_0.9375rem_0_rgb(0,0,0,0.1)]",
        className
      )}
      {...rest}>
      <div className='ddui-mx-auto ddui-flex ddui-max-w-7xl ddui-items-center ddui-px-14 sm:ddui-px-8 lg:ddui-px-6'>
        <div className='ddui-flex ddui-flex-row ddui-items-center'>
          <DduiLink href='/'>
            <span>{logo}</span>
          </DduiLink>
          <ul className='ddui-flex ddui-content-center ddui-items-center'>
            <li className='ddui-ml-2 ddui-text-gray-200'>
              <svg
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1'
                strokeLinecap='round'
                className='h-8 w-8'
                strokeLinejoin='round'
                fill='none'
                shapeRendering='geometricPrecision'>
                <path d='M16.88 3.549L7.12 20.451' />
              </svg>
            </li>
            <li
              className='ddui-font-normal'
              style={{ letterSpacing: ".001em" }}>
              <DduiLink
                href={repositoryUrl}
                className='ddui-cursor-pointer ddui-text-azuki-maroon ddui-no-underline ddui-transition-colors ddui-duration-200 hover:ddui-text-accents-8'
                target='_blank'
                rel='noreferrer noopener'>
                {displayPath}
              </DduiLink>
            </li>
          </ul>
        </div>
        <div className='ddui-hidden ddui-flex-1 ddui-justify-end md:ddui-flex'>
          <nav className='ddui-inline-flex ddui-flex-row ddui-items-center'>
            <span className='ddui-ml-2 ddui-flex ddui-h-full ddui-cursor-not-allowed ddui-items-center ddui-text-accents-5'>
              <Button
                variant='secondary'
                Component='a'
                href={REPO_URL}
                target='_blank'
                rel='noreferrer noopener'>
                View the Codebase →
              </Button>
            </span>
            <span className='h-full ddui-ml-2 ddui-flex ddui-cursor-not-allowed ddui-items-center ddui-text-accents-5'>
              <DeployButton
                {...deployButton}
                variant={variant ? variant : "primary"}
                repositoryUrl={repositoryUrl}
                projectName={deployButton?.projectName ?? path}
                repositoryName={deployButton?.repositoryName ?? path}
              />
            </span>
          </nav>
        </div>
      </div>
    </nav>
  );
}

Nav.displayName = "Nav";

export default Nav;
