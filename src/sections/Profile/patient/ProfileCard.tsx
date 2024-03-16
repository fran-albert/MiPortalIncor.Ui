// import { formatDate, formatearDNI, stateName } from "@/common/Utils";
import { useEffect, useState } from "react";
// import ChangePasswordModal from "./change.password";
// import toast, { Toaster } from "react-hot-toast";
// import LoadingPage from "@/components/Loading";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
// import { State } from "@/common/interfaces/state.interface";
// import EditUserModal from "./edit.user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { createApiUserRepositroy } from "@/modules/users/infra/ApiUserRepository";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { State } from "@/modules/state/domain/State";
import { City } from "@/modules/city/domain/City";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import Loading from "@/components/Loading/loading";

export default function ProfileCardComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<Patient | undefined>();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedHealthInsurance, setSelectedHealthInsurance] =
    useState<HealthInsurance>();
  const [selectedHealthPlan, setSelectedHealthPlan] = useState<HealthPlans>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userRepository = createApiPatientRepository();
    const loadPatient = getPatient(userRepository);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await loadPatient(id);
        setProfile(userData);
        setSelectedState(userData?.address.city.state);
        setSelectedCity(userData?.address.city);
        setSelectedHealthInsurance(userData?.healthPlans[0]?.healthInsurance);
        setSelectedHealthPlan(userData?.healthPlans[0]);
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handleHealthPlanChange = (healthPlan: HealthPlans) => {
    setSelectedHealthPlan(healthPlan);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const handleEditPassword = () => {
    setOpenModal(true);
  };

  //   if (!user || !states) {
  //     return <LoadingPage props="Cargando tu perfil..." />;
  //   }

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <div className="w-full p-6 mt-16">
        <h2 className="text-2xl font-semibold leading-tight">Mi Perfil</h2>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="group rounded-2xl overflow-hidden">
              <img
                src={
                  "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
                alt="Imagen del Paciente"
                width={100}
                height={100}
                className="rounded-2xl"
              />
              <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div
                  className="bg-black p-2 rounded-full cursor-pointer"
                  // onClick={handleEditPictureClick}
                >
                  <FaCamera className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-medium">
            {profile?.firstName} {profile?.lastName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center rounded-lg">
          <div className="w-full p-4">
            <h1 className="text-xl font-semibold mb-4">Datos Personales</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  defaultValue={profile?.firstName}
                />
              </div>

              <div>
                <Label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </Label>
                <Input
                  id="lastname"
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  type="text"
                  defaultValue={profile?.lastName}
                />
              </div>

              <div>
                <Label htmlFor="dni">D.N.I.</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                  defaultValue={profile?.dni ? formatDni(profile?.dni) : ""}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="healthCare">Fecha de Nacimiento</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                  defaultValue={profile?.birthDate.toString()}
                  readOnly
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Contacto</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  // {...register("email")}
                  defaultValue={profile?.email}
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  // {...register("phone", { required: true })}
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  defaultValue={profile?.phoneNumber}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Ubicación</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="state">Provincia</Label>
                <StateSelect
                  selected={selectedState}
                  onStateChange={handleStateChange}
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <CitySelect
                  idState={selectedState?.id}
                  selected={selectedCity}
                  onCityChange={handleCityChange}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Dirección</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Label htmlFor="street">Calle</Label>
                <Input
                  // {...register("address.street")}
                  className="bg-gray-200"
                  defaultValue={profile?.address.street}
                />
              </div>

              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  // {...register("address.number")}
                  className="bg-gray-200"
                  defaultValue={profile?.address.number}
                />
              </div>
              <div>
                <Label htmlFor="street">Piso</Label>
                <Input
                  // {...register("address.description")}
                  className="bg-gray-200"
                  defaultValue={profile?.address.description}
                />
              </div>
              <div>
                <Label htmlFor="street">Departamento *</Label>
                <Input
                  // {...register("address.description")}
                  className="bg-gray-200"
                  defaultValue={profile?.address.description}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Seguro Médico</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Obra Social</Label>
                <HealthInsuranceSelect
                  selected={selectedHealthInsurance}
                  onHealthInsuranceChange={handleHealthInsuranceChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Plan</Label>
                <HealthPlanSelect
                  selected={selectedHealthPlan}
                  idHealthInsurance={Number(selectedHealthInsurance?.id)}
                  onPlanChange={handleHealthPlanChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button
                className="font-medium"
                variant="outline"
                onClick={handleEditPassword}
              >
                Cambiar Contraseña
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                type="submit"
              >
                Modificar Datos
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <ChangePasswordModal
        isOpen={openModal}
        onOpenChange={setOpenModal}
        user={user}
      /> */}
    </>
  );
}
