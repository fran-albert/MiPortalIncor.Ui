import { DataTable } from "@/components/Table/dateTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getAllDoctors } from "@/modules/doctors/application/get-all/getAllDoctors";
import Loading from "@/components/Loading/loading";
import { useSession } from "next-auth/react";

export const DoctorsTable = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const doctorRepository = createApiDoctorRepository();
    const loadAllDoctors = getAllDoctors(doctorRepository);

    const fetchUsers = async () => {
      try {
        const doctorData = await loadAllDoctors(token ?? "");
        setDoctors(doctorData);
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
      <h1 className="text-2xl text-start font-medium mb-4">Lista de Médicos</h1>
      <DataTable
        columns={columns}
        data={doctors}
        searchPlaceholder="Buscar médicos..."
        showSearch={true}
        addLinkPath="medicos/agregar"
        addLinkText="Agregar Médico"
      />
    </>
  );
};
