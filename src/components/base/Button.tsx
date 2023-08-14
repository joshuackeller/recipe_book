"use client";

import { FormEvent, MouseEvent, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  text?: string;
  onClick?: (e: MouseEvent) => any;
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  href?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  children,
  className,
  type = "button",
  href,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <ConditionalLink href={href}>
      <button
        className={clsx(
          "px-8 py-2 bg-black rounded-md text-white hover:bg-black/80 whitespace-nowrap",
          isLoading && "bg-black/80 animate-pulse",
          className
        )}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {text ?? children}
      </button>
    </ConditionalLink>
  );
};

const ConditionalLink = ({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) => {
  if (!!href) {
    return <Link href={href}>{children}</Link>;
  } else {
    return <>{children}</>;
  }
};

export default Button;
