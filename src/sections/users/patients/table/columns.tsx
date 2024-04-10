"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditButton } from "@/components/Button/Edit/button";
import AddLabDialog from "@/components/Button/Add/Lab/button";
import { formatDni } from "@/common/helpers/helpers";
import { FaRegEye } from "react-icons/fa";
import DeletePatientDialog from "../delete/DeletePatientDialog";
import { Button } from "@/components/ui/button";
import { ViewButton } from "@/components/Button/View/button";
import { Patient } from "@/modules/patients/domain/Patient";

export const getColumns = (
  fetchPatients: () => void,
  roles: { isSecretary: boolean; isDoctor: boolean }
): ColumnDef<Patient>[] => {
  const columns: ColumnDef<Patient>[] = [
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
                  ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${row.original.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              alt="@username"
            />
            <AvatarFallback>
              {`${row.original.firstName.charAt(
                0
              )}${row.original.lastName.charAt(0)}`}
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
      header: "D.N.I.",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">{formatDni(row.original.dni)}</p>
        </div>
      ),
    },
    {
      header: "Teléfono",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">{row.original.phoneNumber}</p>
        </div>
      ),
    },
    {
      accessorKey: "healthPlans",
      header: "Obra Social - Plan",
      cell: ({ row }) => {
        const firstHealthPlan = row.original.healthPlans[0];
        const healthPlanDisplay = `${firstHealthPlan?.healthInsurance.name} - ${firstHealthPlan?.name}`;

        return (
          <div className="flex items-center">
            <p className="text-sm font-medium">{healthPlanDisplay}</p>
          </div>
        );
      },
    },

    {
      header: "Domicilio",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex flex-col ml-2">
            {row.original.address?.city?.state?.name}, {""}{" "}
            {`${row.original.address?.city?.name}`}
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
              <ViewButton
                id={row.original.userId}
                text="Ver Paciente"
                path="pacientes"
              />
              <DeletePatientDialog
                idPatient={row.original.userId}
                onPatientDeleted={fetchPatients}
              />
            </>
          )}
          {roles.isDoctor && (
            <>
              <Button>Ver Paciente</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
