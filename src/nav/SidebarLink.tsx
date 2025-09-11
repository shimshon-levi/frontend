import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn"; // או איפה שהפונקציה אצלך

type Props = {
  to: string;
  end?: boolean; // ברירת מחדל: התאמה חלקית, לוח בקרה יקבל true
  children: React.ReactNode;
  className?: string;
};

export default function SidebarLink({ to, end, children, className }: Props) {
  return (
    <NavLink
      to={to}
      end={end} // <-- זה הפתרון
      className={({ isActive }) =>
        cn(
          "flex items-center justify-between w-full rounded-xl px-3 py-2 border transition",
          "text-gray-700 border-transparent hover:bg-gray-50",
          isActive && "bg-indigo-50 text-indigo-700 border-indigo-200",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
}
