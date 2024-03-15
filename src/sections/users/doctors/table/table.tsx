import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getAllDoctors } from "@/modules/doctors/application/get-all/getAllDoctors";
import Loading from "@/components/Loading/loading";

export const DoctorsTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const doctorRepository = createApiDoctorRepository();
  const loadAllDoctors = getAllDoctors(doctorRepository);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const doctorData = await loadAllDoctors();
      setDoctors(doctorData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const doctorColumns = getColumns(fetchDoctors);

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (isLoading) {
    return <Loading isLoading />;
  }

  console.log(doctors)

  return (
    <>
    <div className="md:ml-[40px] w-11/12 border-2 border-rose-500">
      {" "}
      <h1 className="text-2xl text-start font-medium mb-4">Lista de Médicos</h1>
      <DataTable
        columns={doctorColumns}
        data={doctors}
        searchPlaceholder="Buscar médicos..."
        showSearch={true}
        searchColumn="firstName"
        addLinkPath="medicos/agregar"
        addLinkText="Agregar Médico"
      />
    </div>
    </>
  );
};
