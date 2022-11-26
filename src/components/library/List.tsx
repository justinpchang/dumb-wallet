import React from "react";

interface Props {
  children: React.ReactNode;
  [other: string]: any;
}

const Container = ({ children }: Props) => (
  <div className="mb-6 bg-slate-200 drop-shadow-sm w-80">{children}</div>
);

const Header = ({ children }: Props) => (
  <div className="mx-3 mt-2 mb-3 text-lg font-normal">{children}</div>
);

const Subheader = ({ children }: Props) => (
  <div className="mx-4 text-xs">{children}</div>
);

const Item = ({ children, ...props }: Props) => (
  <div
    className="flex flex-col m-2 p-2 bg-white text-sm cursor-pointer"
    {...props}
  >
    {children}
  </div>
);

export { Container, Header, Subheader, Item };
