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

  if (isLoading) {
    return <Loading isLoading />;
  }

  console.log(patients)

  return (
    <>
    <div className="md:ml-[40px] w-11/12">
      {" "}
      <h1 className="text-2xl text-start font-medium mb-4">
        Patients
      </h1>
      <DataTable
        columns={patientColumns}
        data={patients}
        searchPlaceholder="Search patients..."
        showSearch={true}
        addLinkPath="pacientes/agregar"
        searchColumn="firstName"
        addLinkText="Add Patient"
        canAddUser={isSecretary}
      />
    </div>  
    </>
  );
};
