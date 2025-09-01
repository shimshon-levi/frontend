import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Column<T> = {
  id: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};
type DataTableProps<T> = { columns: Column<T>[]; data: T[] };

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={String(c.id)}>{c.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((c) => (
                <TableCell key={String(c.id)}>
                  {c.render ? c.render(row) : (row as any)[c.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
