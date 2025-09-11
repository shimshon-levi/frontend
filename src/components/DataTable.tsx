type Column<T = any> = {
  field: keyof T & string;
  headerName: string;
  width?: number;
};
type Props<T = any> = { rows?: T[]; columns?: Column<T>[] };

export default function DataTable<T = any>({
  rows = [],
  columns = [],
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b bg-gray-50">
            {columns.map((c) => (
              <th
                key={String(c.field)}
                style={{ width: c.width }}
                className="px-3 py-2 font-medium"
              >
                {c.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-gray-500"
              >
                אין נתונים
              </td>
            </tr>
          ) : (
            rows.map((r: any, i) => (
              <tr
                key={i}
                className="border-b last:border-none hover:bg-gray-50"
              >
                {columns.map((c) => (
                  <td key={String(c.field)} className="px-3 py-2">
                    {String(r[c.field] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
