"use client";

import clsx from "clsx";

interface Props {
  className?: string;
  [other: string]: any;
}

export const WhiteBackground = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-white -z-10" />
  );
};

export const Form = ({ className, ...props }: Props) => {
  return <form className={clsx(className, "flex flex-col gap-6")} {...props} />;
};

export const Heading = ({ className, ...props }: Props) => {
  return (
    <h2
      className={clsx(
        className,
        "text-xl font-bold font-heading leading-7 text-text-900"
      )}
      {...props}
    />
  );
};

export const Subheading = ({ className, ...props }: Props) => {
  return (
    <h3
      className={clsx(className, "mr-4 -mt-3 text-base text-gray-400")}
      {...props}
    />
  );
};

export const Label = ({ className, ...props }: Props) => {
  return (
    <label
      className={clsx(className, "flex flex-col text-sm font-semibold gap-2")}
      {...props}
    />
  );
};

export const TextInput = ({ className, ...props }: Props) => {
  return (
    <input
      type="text"
      className={clsx(
        className,
        // positioning
        "block w-full rounded-md border-0 py-1.5 px-3",
        // effects
        "bg-background shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring--600",
        // text
        "font-normal text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
      )}
      {...props}
    />
  );
};
