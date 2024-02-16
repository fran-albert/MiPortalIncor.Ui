import { DataTable } from "@/components/Table/dateTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getAllDoctors } from "@/modules/doctors/application/get-all/getAllDoctors";

export const DoctorsTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const doctorRepository = createApiDoctorRepository();
    const loadAllDoctors = getAllDoctors(doctorRepository);

    const fetchUsers = async () => {
      try {
        const doctorData = await loadAllDoctors();
        setDoctors(doctorData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={doctors}
      searchPlaceholder="Buscar médicos..."
      showSearch={true}
      addLinkPath="medicos/agregar"
      addLinkText="Agregar Médico"
    />
  );
};
