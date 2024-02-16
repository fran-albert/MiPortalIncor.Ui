"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { ICategory } from "@/interfaces/category.interface";
// import DeleteCategoryDialog from "./deleteCategory";
import { Button } from "@/components/ui/button";
// import ActionIcon from "@/components/ui/actionIcon";
import { FaPencilAlt } from "react-icons/fa";
import { ILab } from "@/common/interfaces/lab.interface";

export const columns: ColumnDef<ILab>[] = [
  {
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => {
      const index = row.index;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Análisis",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "file",
    header: "Archivo",
  },
];
