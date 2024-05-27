"use client";
import { PatientTable } from "@/sections/users/patients/table/table";
import Loading from "@/components/Loading/loading";
import { useAuthNotPatientLoading } from "@/hooks/usePatientAuth";

const PatientsPage = () => {
  const { isLoading } = useAuthNotPatientLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <div>
      <PatientTable />
    </div>
  );
};

export default PatientsPage;
