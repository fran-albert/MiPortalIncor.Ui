import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllPatients } from "@/modules/patients/application/get-all/getAllPatients";
import { Patient } from "@/modules/patients/domain/Patient";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";

export const PatientTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const patientRepository = createApiPatientRepository();
  const loadAllPatients = getAllPatients(patientRepository);
  const { isSecretary, isDoctor } = useRoles();

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const patientData = await loadAllPatients();
      setPatients(patientData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const patientColumns = getColumns(fetchPatients, { isSecretary, isDoctor });

  useEffect(() => {
    fetchPatients();
  }, []);

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
