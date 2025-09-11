import { cn } from "../../utils/cn";
type Props = React.HTMLAttributes<HTMLSpanElement> & {
  color?: "gray" | "green" | "amber" | "blue" | "purple";
};
export default function Badge({ color = "gray", className, ...rest }: Props) {
  const map = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        map[color],
        className
      )}
      {...rest}
    />
  );
}
