import { DataTable } from "@/components/Table/dateTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllPatients } from "@/modules/patients/application/get-all/getAllPatients";
import { Patient } from "@/modules/patients/domain/Patient";
import { useSession } from "next-auth/react";

export const PatientTable = () => {
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const patientRepository = createApiPatientRepository();
    const loadAllPatients = getAllPatients(patientRepository);

    const fetchUsers = async () => {
      try {
        const patientData = await loadAllPatients(token);
        setPatients(patientData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={patients}
      searchPlaceholder="Buscar pacientes..."
      showSearch={true}
      addLinkPath="pacientes/agregar"
      searchColumn="firstName"
      addLinkText="Agregar Paciente"
    />
  );
};
