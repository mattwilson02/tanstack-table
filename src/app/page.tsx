"use client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

//TData
type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

export default function Home() {
  const data: User[] = [
    {
      firstName: "Tanner",
      lastName: "Linsley",
      age: 33,
      visits: 100,
      progress: 50,
      status: "Married",
    },
    {
      firstName: "Kevin",
      lastName: "Vandy",
      age: 27,
      visits: 200,
      progress: 100,
      status: "Single",
    },
  ];

  const columns: ColumnDef<User>[] = [];
  const columnHelper = createColumnHelper<User>();

  const table = useReactTable({
    data,
    columns: [
      columnHelper.accessor("firstName", {
        header: "First Name",
      }),
      columnHelper.accessor("lastName", {
        header: "Last Name",
      }),
      columnHelper.accessor("age", {
        header: "Age",
      }),
      columnHelper.accessor("progress", {
        header: "Progress",
        cell: (cell) => <progress value={cell.getValue()} max={100} />,
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
    ],

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-black p-2 border" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="text-black border p-2" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
