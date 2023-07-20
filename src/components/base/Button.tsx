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
}

const Button = ({
  text,
  onClick,
  children,
  className,
  type = "button",
  href,
}: ButtonProps) => {
  return (
    <ConditionalLink href={href}>
      <button
        className={clsx(
          "px-8 py-2 bg-black rounded text-white hover:bg-black/80",
          className
        )}
        onClick={onClick}
        type={type}
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
