import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={clsx("p-5 shadow rounded-xl", className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
