import { cn } from "../utils/cn";
type Props = { className?: string; title?: string; children?: React.ReactNode };
export default function PageWrapper({ className, title, children }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
      {children}
    </div>
  );
}
