import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const styles = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium " +
    "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        outline: "border border-gray-300 bg-white hover:bg-gray-50",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
      },
      size: { sm: "h-9 px-3", md: "h-10 px-4", lg: "h-11 px-5" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles>;

export default function Button({ className, variant, size, ...props }: Props) {
  return (
    <button className={cn(styles({ variant, size }), className)} {...props} />
  );
}
