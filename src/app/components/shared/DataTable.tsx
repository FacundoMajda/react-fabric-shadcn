import React from "react";
import DataTable from "react-data-table-component";
import type {
  TableColumn,
  ConditionalStyles,
} from "react-data-table-component";
import { useTheme } from "next-themes";

export interface DataTableProps<T> {
  title?: string | React.ReactNode;
  columns: TableColumn<T>[];
  data: T[];
  pagination?: boolean;
  paginationPerPage?: number;
  onRowClicked?: (row: T, e: React.MouseEvent) => void;
  conditionalRowStyles?: ConditionalStyles<T>[];
  tableClassName?: string;
}

const DataTableComponent = <T extends Record<string, unknown>>({
  title,
  columns,
  data,
  pagination = true,
  paginationPerPage,
  onRowClicked,
  conditionalRowStyles,
  tableClassName,
}: DataTableProps<T>) => {
  const { resolvedTheme } = useTheme();

  const computedClass =
    tableClassName ??
    (resolvedTheme === "dark"
      ? "bg-gray-900 text-white border border-gray-700 rounded-md"
      : "bg-white text-black border border-gray-300 rounded-md");

  return (
    <DataTable<T>
      className={computedClass}
      title={title}
      columns={columns}
      data={data}
      pagination={pagination}
      paginationPerPage={paginationPerPage}
      onRowClicked={onRowClicked}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default DataTableComponent;
