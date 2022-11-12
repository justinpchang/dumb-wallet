import React from "react";

interface Props {
  onClick: (ev: React.MouseEvent) => any;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    className="px-3 py-2 bg-white border shadow hover:bg-slate-100 active:shadow-inner"
  >
    {children}
  </button>
);

export default Button;
