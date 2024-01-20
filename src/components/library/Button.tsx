import clsx from "clsx";
import React from "react";

type Theme = "primary" | "secondary";

interface Props {
  theme: Theme;
  onClick?: (ev: React.MouseEvent) => any;
  className?: string;
  [other: string]: any;
}

const BASE_STYLE =
  "cursor-pointer rounded-md px-3 py-3 font-semibold text-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const THEMES: { primary: string; secondary: string } = {
  primary: "bg-primary-800 text-white hover:bg-primary-700",
  secondary: "bg-primary-200 text-black hover:bg-primary-300",
};

const Button = ({ theme, onClick, className, ...props }: Props) => (
  <button
    onClick={onClick}
    className={clsx(
      className,
      BASE_STYLE,
      THEMES[theme],
      props.disabled && "opacity-50 pointer-events-none"
    )}
    {...props}
  />
);

export default Button;
