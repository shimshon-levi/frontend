type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: "orange" | "purple" | "emerald" | "indigo";
};
export default function StatCard({
  title,
  value,
  subtitle,
  accent = "indigo",
}: Props) {
  const accentClass = {
    orange: "kpi-accent-orange",
    purple: "kpi-accent-purple",
    emerald: "kpi-accent-emerald",
    indigo: "kpi-accent-indigo",
  }[accent];
  return (
    <div className={`kpi ${accentClass}`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {subtitle ? (
        <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
      ) : null}
    </div>
  );
}
