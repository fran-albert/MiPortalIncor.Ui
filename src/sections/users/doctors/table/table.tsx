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

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <h1 className="text-2xl text-start font-medium mb-4">
                Lista de Médicos
              </h1>
              <div className="overflow-hidden sm:rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
