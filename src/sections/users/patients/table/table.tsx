import { DataTable } from "@/components/Table/dateTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllPatients } from "@/modules/patients/application/get-all/getAllPatients";
import { Patient } from "@/modules/patients/domain/Patient";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/loading";

export const PatientTable = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const patientRepository = createApiPatientRepository();
    const loadAllPatients = getAllPatients(patientRepository);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const patientData = await loadAllPatients(token ?? "");
        setPatients(patientData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
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
        columns={columns}
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
