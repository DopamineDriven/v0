import type React from "react";
import {mapParams} from "../../lib/map-params";
import Button from "../Buttons";

const VERCEL_CLONE = "https://vercel.com/new/clone" as const;

export interface DeployButtonProps {
  repositoryUrl: `https://${string}`;
  env?: string[];
  projectName?: string;
  className?: string;
  repositoryName?: string;
  variant?: "primary" | "secondary" | "ghost" | "violet" | "black" | "white";
}

const DeployButton: React.FC<DeployButtonProps> = props => {
  const query = mapParams([
    ["repository-url", props.repositoryUrl],
    ["env", props.env?.join(",")],
    ["project-name", props.projectName],
    ["repository-name", props.repositoryName]
  ]);

  return (
    <Button
      Component='a'
      className={props?.className}
      variant={props.variant ?? "primary"}
      href={`${VERCEL_CLONE}${query ? `?${query}` : ""}`}
      target='_blank'
      rel='noreferrer noopener'>
      Clone & Deploy
    </Button>
  );
};

DeployButton.displayName = "DeployButton";

export default DeployButton;
