"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/components/Button/Edit/button";
import DeleteCategoryDialog from "@/components/Button/Delete/button";
import { User } from "@/modules/users/domain/User";

export const columns: ColumnDef<User>[] = [
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
    header: "Médico",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={
              row.original.photo
                ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${row.original.photo}`
                : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
            }
            alt="@username"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-2">
          {" "}
          {/* <p className="text-sm font-medium">{`${row.getValue("name")} ${
            row.original.lastname
          }`}</p> */}
          <span
            style={{ fontSize: "0.75rem" }}
            className="text-teal-800 font-bold"
          >
            {row.original.email}
          </span>{" "}
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: "dni",
  //   header: "Matrícula",
  // },
  // {
  //   accessorKey: "dni",
  //   header: "DNI",
  // },
  // {
  //   accessorKey: "phone",
  //   header: "Teléfono",
  // },
  // {
  //   accessorKey: "healthInsurance",
  //   header: "Especialidad",
  // },
  //   {
  //     header: "Domicilio",
  //     cell: ({ row }) => (
  //       <div className="flex items-center">
  //         <div className="flex flex-col ml-2">
  //           {row.original.lastname}, {""} {`${row.original.city.city}`}
  //         </div>
  //       </div>
  //     ),
  //   },
  {
    header: " ",
    cell: ({ row }) => (
      <div className="flex items-center">
        <EditButton id={row.original.id} path="usuarios/medicos" />
        <DeleteCategoryDialog idCategory={row.original.id} />
      </div>
    ),
  },
];
