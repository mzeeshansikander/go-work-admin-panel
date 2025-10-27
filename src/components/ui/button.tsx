// Libs Imports
import { cn } from "@/lib/utils";

// React & next Imports
import Link from "next/link";
import React from "react";

interface IButton {
  text: unknown;
  type?: "submit" | "button";
  onClick?: () => void;
  onCopy?: (value: string) => void;
  className?: string;
  isOutline?: boolean;
  redirectURL?: string;
  disabled?: boolean;
  isIcon?: boolean;
}

/**
 * Button component
 * @returns
 *
 * @example
 * <Button
 *    text="Title"
 *    onClick={() => {}}
 *    type="submit"
 *    isBlack={false}
 *    isIcon={false}
 *    disabled={false}
 *    redirectURL={'/'}
 *    className='bg-black'
 * />
 */
const Button = ({
  text,
  onClick,
  type = "button",
  className,
  isOutline,
  redirectURL,
  disabled,
}: IButton) => {
  const classes = cn(
    `${isOutline ? "border border-divider bg-transparent text-text-primary" : "bg-primary text-white"}`,
    "font-medium text-sm",
    "w-fit h-11",
    "px-6 py-2",
    "rounded-lg",
    "flex items-center justify-center gap-x-3",
    className,
  );

  if (redirectURL) {
    return (
      <Link href={redirectURL} className="w-fit">
        <div className={classes}>{text as React.ReactNode}</div>
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={classes}
    >
      {text as React.ReactNode}
    </button>
  );
};
export default Button;
