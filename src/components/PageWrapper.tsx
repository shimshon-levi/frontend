import clsx from "clsx";
import type { PropsWithChildren } from "react";

type PageWrapperProps = PropsWithChildren<{ className?: string }>;

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  const pageWrapperClass = clsx(
    "flex flex-col min-h-screen bg-accent",
    className
  );
  const contentClass = clsx("w-full max-w-screen px-3 sm:px-6 md:px-8");
  return (
    <div className={pageWrapperClass}>
      <div className={contentClass}>{children}</div>
    </div>
  );
};

export default PageWrapper;
