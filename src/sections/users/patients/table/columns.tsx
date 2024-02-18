"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/components/Button/Edit/button";
import AddLabDialog from "@/components/Button/Add/Lab/button";
import { formatDni } from "@/common/helpers/helpers";
import { User } from "@/modules/users/domain/User";
import { FaRegEye } from "react-icons/fa";
import DeletePatientDialog from "../delete/DeletePatientDialog";

export const getColumns = (fetchPatients: () => void): ColumnDef<User>[] => [
  {
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => {
      const index = row.index;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: "Paciente",
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
          <AvatarFallback>
            {`${row.original.firstName.charAt(0)}${row.original.lastName.charAt(
              0
            )}`}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-2">
          {" "}
          <p className="text-sm font-medium">
            {row.original.lastName}, {row.original.firstName}
          </p>
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
  {
    accessorKey: "dni",
    header: "DNI",
    cell: ({ row }) => <div>{formatDni(row.original.userName)}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Teléfono",
  },
  {
    accessorKey: "healthInsurance",
    header: "Obra Social",
  },
  {
    header: "Domicilio",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="flex flex-col ml-2">
          {/* {row.original.city.idState}, {""} {`${row.original.city.city}`} */}
          Santa fe , rosario
        </div>
      </div>
    ),
  },
  {
    header: " ",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <FaRegEye className="text-gray-500 cursor-pointer" size={25} />
        <AddLabDialog idPatient={row.original.id} />
        <EditButton id={row.original.id} path="usuarios/pacientes" />
        <DeletePatientDialog
          idPatient={row.original.id}
          onPatientDeleted={fetchPatients}
        />
      </div>
    ),
  },
];
