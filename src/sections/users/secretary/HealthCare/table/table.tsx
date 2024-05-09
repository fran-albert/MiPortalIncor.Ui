import { DataTable } from "@/components/Table/dateTable";
import { getColumns } from "./columns";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/loading";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { getAllSpecialities } from "@/modules/speciality/application/get-all/getAllSpecialities";
import AddSpecialityDialog from "@/components/Button/Add/Speciality/button";
// import EditSpecialityDialog from "../edit/EditHealthInsuranceDialog";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { getAll } from "@/modules/healthInsurance/application/get-all/getAllHealthInsurance";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import useRoles from "@/hooks/useRoles";

export const HealthInsuranceTable = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingHealthInsurance, setEditingHealthInsurance] =
    useState<HealthInsurance | null>(null);
  const { isSecretary, isDoctor } = useRoles();
  const [isLoading, setIsLoading] = useState(true);
  const [healthInsurance, setHealthInsurance] = useState<HealthInsurance[]>([]);
  const healthInsuranceRepository = createApiHealthInsuranceRepository();
  const loadAllHealthInsurance = getAll(healthInsuranceRepository);
  const [isAddHealthInsuranceDialogOpen, setIsAddHealthInsuranceDialogOpen] =
    useState(false);
  const openAddHealthInsuranceDialog = () =>
    setIsAddHealthInsuranceDialogOpen(true);
  const fetchSpecialities = async () => {
    try {
      setIsLoading(true);
      const HealthInsuranceData = await loadAllHealthInsurance();
      setHealthInsurance(HealthInsuranceData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditHealthInsurance = (HealthInsurance: HealthInsurance) => {
    setEditingHealthInsurance(HealthInsurance);
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const customFilterFunction = (
    healthInsurance: HealthInsurance,
    query: string
  ) => healthInsurance.name.toLowerCase().includes(query.toLowerCase());

  // const addSpecialityToList = (newSpeciality: Speciality) => {
  //   setHealthInsurance((currentSpecialities) => [
  //     ...currentSpecialities,
  //     newSpeciality,
  //   ]);
  // };

  // const updateSpecialityInList = (updatedSpeciality: Speciality) => {
  //   setHealthInsurance((currentSpecialities) =>
  //     currentSpecialities.map((speciality) =>
  //       speciality.id === updatedSpeciality.id ? updatedSpeciality : speciality
  //     )
  //   );
  // };

  const removeHealthInsuranceFromList = (idHC: number) => {
    setHealthInsurance((currentHealthInsurances) =>
      currentHealthInsurances.filter(
        (healthInsurance) => Number(healthInsurance.id) !== idHC
      )
    );
  };

  const healthInsuranceColumns = getColumns(
    removeHealthInsuranceFromList,
    isDoctor,
    handleEditHealthInsurance
  );

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className="md:ml-[40px] w-11/12">
      <h1 className="text-2xl text-start font-medium mb-4">
        Lista de Obras Sociales
      </h1>
      <DataTable
        columns={healthInsuranceColumns}
        data={healthInsurance}
        searchPlaceholder="Buscar obra social..."
        showSearch={true}
        onAddClick={openAddHealthInsuranceDialog}
        searchColumn="name"
        addLinkPath=""
        addLinkText="Agregar Obra Social"
        customFilter={customFilterFunction}
        canAddUser={isSecretary}
      />
      {/* <AddSpecialityDialog
        isOpen={isAddHealthInsuranceDialogOpen}
        setIsOpen={setIsAddHealthInsuranceDialogOpen}
        onSpecialityAdded={addSpecialityToList}
      /> */}
      {/* {isEditDialogOpen && editingHealthInsurance && (
        // <EditSpecialityDialog
        //   isOpen={isEditDialogOpen}
        //   setIsOpen={setIsEditDialogOpen}
        //   speciality={editingHealthInsurance}
        //   updateSpecialityInList={updateSpecialityInList}
        // />
      )} */}
    </div>
  );
};
