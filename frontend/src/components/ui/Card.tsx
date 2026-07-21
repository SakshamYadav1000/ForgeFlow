import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-xl
        bg-white
        p-8
        shadow-lg
      "
    >
      {children}
    </div>
  );
}