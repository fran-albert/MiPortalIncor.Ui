import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect } from "react";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import Loading from "@/components/Loading/loading";
import { useDoctorStore } from "@/hooks/useDoctors";

export const DoctorsTable = () => {
  const { doctors, isLoading, fetchDoctors } = useDoctorStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);
  const doctorColumns = getColumns(fetchDoctors);

  const customFilterFunction = (doctor: Doctor, query: string) =>
    doctor.firstName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(query.toLowerCase()) ||
    doctor.dni.toLowerCase().includes(query.toLowerCase());

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Lista de Médicos
              </h2>

              <div className="overflow-hidden sm:rounded-lg">
                <DataTable
                  columns={doctorColumns}
                  data={doctors}
                  searchPlaceholder="Buscar médicos..."
                  showSearch={true}
                  customFilter={customFilterFunction}
                  searchColumn="firstName"
                  addLinkPath="medicos/agregar"
                  addLinkText="Agregar Médico"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
