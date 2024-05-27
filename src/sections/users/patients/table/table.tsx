import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect } from "react";
import { Patient } from "@/modules/patients/domain/Patient";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import { usePatient } from "@/hooks/usePatients";

export const PatientTable = () => {
  const { isSecretary, isDoctor, isAdmin } = useRoles();
  const { patients, isLoading, fetchPatients } = usePatient();
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const patientColumns = getColumns(fetchPatients, {
    isSecretary,
    isDoctor,
    isAdmin,
  });
  const customFilterFunction = (patient: Patient, query: string) =>
    patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
    patient.dni.toLowerCase().includes(query.toLowerCase());

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
                Lista de Pacientes
              </h2>
              <div className="overflow-hidden sm:rounded-lg">
                <DataTable
                  columns={patientColumns}
                  data={patients}
                  searchPlaceholder="Buscar pacientes..."
                  showSearch={true}
                  addLinkPath="pacientes/agregar"
                  customFilter={customFilterFunction}
                  addLinkText="Agregar Paciente"
                  canAddUser={isSecretary}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
