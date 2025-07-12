import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={className}>{children}</div>;
};
