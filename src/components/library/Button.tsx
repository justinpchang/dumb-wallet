import React from "react";

type Theme = "primary" | "ghost";

interface Props {
  theme: Theme;
  onClick?: (ev: React.MouseEvent) => any;
  children: React.ReactNode;
  [other: string]: any;
}

const THEMES: { primary: string; ghost: string } = {
  primary:
    "px-3 py-2 bg-white border shadow hover:bg-slate-100 active:shadow-inner",
  ghost: "",
};

const Button = ({ theme, onClick, children, ...props }: Props) => (
  <button onClick={onClick} className={THEMES[theme]} {...props}>
    {children}
  </button>
);

export default Button;
