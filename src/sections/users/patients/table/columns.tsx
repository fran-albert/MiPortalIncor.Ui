"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/components/Button/Edit/button";
import AddLabDialog from "@/components/Button/Add/Lab/button";
import { formatDni } from "@/common/helpers/helpers";
import { User } from "@/modules/users/domain/User";
import { FaRegEye } from "react-icons/fa";
import DeletePatientDialog from "../delete/DeletePatientDialog";
import { Button } from "@/components/ui/button";
import { ViewButton } from "@/components/Button/View/button";

export const getColumns = (
  fetchPatients: () => void,
  roles: { isSecretary: boolean; isDoctor: boolean }
): ColumnDef<User>[] => {
  const columns: ColumnDef<User>[] = [
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
      header: "Patient",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={
                row.original.user.photo
                  ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${row.original.user.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              alt="@username"
            />
            <AvatarFallback>
              {`${row.original.user.firstName.charAt(
                0
              )}${row.original.user.lastName.charAt(0)}`}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2">
            {" "}
            <p className="text-sm font-medium">
              {row.original.user.lastName}, {row.original.user.firstName}
            </p>
            <span
              style={{ fontSize: "0.75rem" }}
              className="text-teal-800 font-bold"
            >
              {row.original.user.email}
            </span>{" "}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "dni",
      header: "Identification",
      cell: ({ row }) => <div>{formatDni(row.original.user.userName)}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "healthInsurance",
      header: "Health Insurance",
    },
    {
      header: "Address",
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
          {roles.isSecretary && (
            <>
              {/* <AddLabDialog idPatient={row.original.id} /> */}
              {/* <EditButton id={row.original.id} path="usuarios/pacientes" /> */}
              <ViewButton id={row.original.id} text="Ver Paciente" />
              <DeletePatientDialog
                idPatient={row.original.id}
                onPatientDeleted={fetchPatients}
              />
            </>
          )}
          {roles.isDoctor && (
            <>
              {/* <FaRegEye className="text-gray-500 cursor-pointer" size={25} /> */}
              <Button>Ver Paciente</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
