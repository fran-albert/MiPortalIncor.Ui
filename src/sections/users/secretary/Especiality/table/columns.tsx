"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import DeleteSpecialityDialog from "../delete/DeleteSpecialityDialog";
import EditSpecialityDialog from "../edit/EditSpecialityDialog";

export const getColumns = (
  removeSpecialityFromList: (idSpeciality: number) => void,
  onSpecialityUpdated?: (updatedSpeciality: Speciality) => void
): ColumnDef<Speciality>[] => {
  const columns: ColumnDef<Speciality>[] = [
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
      header: "Especialidad",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <>
            <EditSpecialityDialog
              idSpeciality={row.original.id}
              onSpecialityUpdated={onSpecialityUpdated}
            />
            <DeleteSpecialityDialog
              idSpeciality={row.original.id}
              removeSpecialityFromList={removeSpecialityFromList}
            />
          </>
        </div>
      ),
    },
  ];

  return columns;
};
