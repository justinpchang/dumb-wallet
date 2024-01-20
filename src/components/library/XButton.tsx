import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props {
  size: number;
  className?: string;
}

export const XButton = ({ size = 6, className }: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        "rounded-full bg-background p-2 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      )}
    >
      <XMarkIcon className={`h-${size} w-${size}`} aria-hidden="true" />
    </button>
  );
};
