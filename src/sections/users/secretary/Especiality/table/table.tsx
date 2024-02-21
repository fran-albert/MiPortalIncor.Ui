import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { getAllSpecialities } from "@/modules/speciality/application/get-all/getAllSpecialities";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";

export const SpecialityTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const specialityRepository = createApiSpecialityRepository();
  const loadAllSpecialities = getAllSpecialities(specialityRepository);
  const [isAddSpecialityDialogOpen, setIsAddSpecialityDialogOpen] =
    useState(false);
  const openAddSpecialityDialog = () => setIsAddSpecialityDialogOpen(true);
  const fetchSpecialities = async () => {
    try {
      setIsLoading(true);
      const specialityData = await loadAllSpecialities();
      setSpecialities(specialityData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const addSpecialityToList = (newSpeciality: Speciality) => {
    setSpecialities((currentSpecialities) => [
      ...currentSpecialities,
      newSpeciality,
    ]);
  };

  const onSpecialityUpdated = (updatedSpeciality: Speciality) => {
    console.log(
      "Actualizando listado de especialidades con: ",
      updatedSpeciality
    );
    setSpecialities((currentSpecialities) =>
      currentSpecialities.map((speciality) =>
        speciality.id === updatedSpeciality.id ? updatedSpeciality : speciality
      )
    );
  };

  const removeSpecialityFromList = (idSpeciality: number) => {
    setSpecialities((currentSpecialities) =>
      currentSpecialities.filter((speciality) => speciality.id !== idSpeciality)
    );
  };

  const specialityColumns = getColumns(
    removeSpecialityFromList,
    onSpecialityUpdated
  );

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <h1 className="text-2xl text-start font-medium mb-4">
        Lista de Especialidades
      </h1>
      <DataTable
        columns={specialityColumns}
        data={specialities}
        searchPlaceholder="Buscar especialidad..."
        showSearch={true}
        onAddClick={openAddSpecialityDialog}
        searchColumn="name"
        addLinkPath=""
        addLinkText="Agregar Especialidad"
      />
      <AddSpecialityDialog
        isOpen={isAddSpecialityDialogOpen}
        setIsOpen={setIsAddSpecialityDialogOpen}
        onSpecialityAdded={addSpecialityToList}
      />
    </>
  );
};
