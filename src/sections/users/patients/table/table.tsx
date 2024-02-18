import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllPatients } from "@/modules/patients/application/get-all/getAllPatients";
import { Patient } from "@/modules/patients/domain/Patient";
import Loading from "@/components/Loading/loading";

export const PatientTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const patientRepository = createApiPatientRepository();
  const loadAllPatients = getAllPatients(patientRepository);

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
  const patientColumns = getColumns(fetchPatients);

  useEffect(() => {
    fetchPatients();
  }, []);

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      {" "}
      <h1 className="text-2xl text-start font-medium mb-4">
        Lista de Pacientes
      </h1>
      <DataTable
        columns={patientColumns}
        data={patients}
        searchPlaceholder="Buscar pacientes..."
        showSearch={true}
        addLinkPath="pacientes/agregar"
        searchColumn="firstName"
        addLinkText="Agregar Paciente"
      />
    </>
  );
};
