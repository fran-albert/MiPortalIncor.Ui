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
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDate, formatDni } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { State } from "@/modules/state/domain/State";
import { City } from "@/modules/city/domain/City";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getDoctor } from "@/modules/doctors/application/get/getDoctor";

export default function ProfileDoctorCardComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<Doctor | undefined>();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();

  useEffect(() => {
    const userRepository = createApiDoctorRepository();
    const loadDoctor = getDoctor(userRepository);

    const fetchUsers = async () => {
      try {
        const userData = await loadDoctor(id);
        setProfile(userData);
        setSelectedState(userData?.address.city.state);
        setSelectedCity(userData?.address.city);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  console.log(profile);

  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const handleEditPassword = () => {
    setOpenModal(true);
  };

  //   if (!user || !states) {
  //     return <LoadingPage props="Cargando tu perfil..." />;
  //   }

  return (
    <>
      <div className="flex justify-center w-full px-4 mt-5 md:ml-24 lg:px-0 lg:ml-20">
        <div className="w-full max-w-7xl">
          <div className=" p-6">
            {/* Header */}
            <div className="border-b pb-6">
              <h2 className="text-2xl font-semibold leading-tight">
                Mi Perfil
              </h2>
            </div>

            <div className="flex flex-col items-center text-center py-6">
              <div className="relative mb-3">
                {/* Image Container */}
                <div className="group rounded-2xl overflow-hidden">
                  {/* {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile Picture"
                    className="rounded-2xl"
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  <img
                    src={
                      session?.user?.photo
                        ? `https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/${session.user.photo}.jpeg`
                        : "https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/default2.png"
                    }
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-2xl"
                  />
                )} */}

                  <img
                    src={
                      "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                    }
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-2xl"
                  />
                  {/* Edit Icon Container */}
                  <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <div
                      className="bg-gray-500 p-2 rounded-full cursor-pointer"
                      // onClick={handleEditPictureClick}
                    >
                      {/* <FaPencilAlt className="text-white" /> */}
                    </div>
                  </div>
                  {/* Hidden File Input */}
                  {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                // / */}
                </div>
              </div>
              <h3 className="text-xl font-medium">
                {profile?.firstName} {profile?.lastName}
              </h3>
              <p className="text-gray-600">
                {isDoctor
                  ? "Doctor"
                  : isPatient
                  ? "Paciente"
                  : isSecretary
                  ? "Secretaria"
                  : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center rounded-lg p-4 ">
              <div className="w-full p-4">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      // {...register("name", { required: true })}
                      className="w-full bg-gray-200 border-gray-300 text-gray-800"
                      defaultValue={profile?.firstName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Apellido</Label>
                    <Input
                      // {...register("lastname", { required: true })}
                      className="w-full bg-gray-200 border-gray-300 text-gray-800"
                      defaultValue={profile?.lastName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="healthCare">D.N.I.</Label>
                    <Input
                      className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                      defaultValue={
                        profile?.userName ? formatDni(profile?.userName) : ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="userName">Correo Electrónico</Label>
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
                  <div>
                    <Label htmlFor="healthCare">Obra Social - Plan</Label>
                    {/* <Input
                      className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                      value={
                        profile?.healthPlans[0].healthInsurance.name +
                        " - " +
                        profile?.healthPlans[0].name
                      }
                      readOnly
                    /> */}
                  </div>
                  <div>
                    <Label htmlFor="healthCare">Fecha de Nacimiento</Label>
                    <Input
                      className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                      defaultValue={formatDate(String(profile?.birthDate))}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Provincia</Label>
                    <StateSelect
                      selected={selectedState}
                      // onStateChange={handleStateChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <CitySelect
                      idState={selectedState?.id}
                      selected={selectedCity}
                      //   onCityChange={handleCityChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label htmlFor="street">Calle</Label>
                      <Input
                        // {...register("address.street")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.street}
                      />
                    </div>

                    <div>
                      <Label htmlFor="number">N°</Label>
                      <Input
                        // {...register("address.number")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.number}
                      />
                    </div>
                    <div>
                      <Label htmlFor="street">Descripción</Label>
                      <Input
                        // {...register("address.description")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.description}
                      />
                    </div>
                    <div>
                      {/* <Label htmlFor="number">Phone Number </Label>
                      <Input
                        // {...register("address.phoneNumber")}
                        className="bg-gray-200"
                        defaultValue={profile?.address.phoneNumber}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
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
                {/* </form> */}
              </div>
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
