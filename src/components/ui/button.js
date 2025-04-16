import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-md font-semibold transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
