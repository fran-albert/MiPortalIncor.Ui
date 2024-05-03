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
import moment from "moment-timezone";
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
import { useForm } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "@/components/Loading/loading";
interface Inputs extends Doctor {}

export default function ProfileDoctorCardComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<Doctor | undefined>();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const userRepository = createApiDoctorRepository();
    const loadDoctor = getDoctor(userRepository);

    const fetchUsers = async () => {
      try {
        const userData = await loadDoctor(id);
        setProfile(userData);
        setSelectedState(userData?.address.city.state);
        setSelectedCity(userData?.address.city);
        setStartDate(new Date(userData?.birthDate ?? new Date()));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  console.log(profile);

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
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

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };
  // if (isLoading) {
  //   return <Loading isLoading />;
  // }

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
            <div className="w-full p-4">
              <h1 className="text-xl font-semibold mb-4">Datos Personales</h1>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre *
                  </Label>
                  <Input
                    {...register("firstName", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={profile?.firstName}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apellido *
                  </Label>
                  <Input
                    {...register("lastName", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={profile?.lastName}
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="matricula">Matrícula N°</Label>
                      <Input
                        {...register("matricula", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.matricula}
                      />
                    </div>
                    <div>
                      <Label htmlFor="healthCare">Fecha de Nacimiento *</Label>
                      <DatePicker
                        showIcon
                        selected={startDate}
                        className="max-w-full"
                        onChange={handleDateChange}
                        locale="es"
                        customInput={
                          <Input className="w-full bg-gray-200 border-gray-300 text-gray-800" />
                        }
                        dateFormat="d MMMM yyyy"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dni">D.N.I. *</Label>
                  <Input
                    {...register("userName", { required: true })}
                    defaultValue={profile?.dni ? formatDni(profile?.dni) : ""}
                    readOnly
                    className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-4">Contacto</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    {...register("email")}
                    defaultValue={profile?.email}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    {...register("phoneNumber", { required: true })}
                    defaultValue={profile?.phoneNumber}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  />
                </div>
              </div>
              <h1 className="text-xl font-semibold mb-4">Atributos Médicos</h1>
              <div className="p-4 border border-green-700 rounded-lg">
                <h3 className="text-lg font-semibold">ESPECIALIDADES</h3>
                <p className="text-sm font-medium">
                  {profile?.specialities
                    .map((speciality) => speciality.name)
                    .join(", ")}
                </p>
                <h3 className="text-lg mt-2 font-semibold">OBRA SOCIAL</h3>
                <p className="text-sm font-medium">
                  {profile?.healthInsurances
                    .map(
                      (item) =>
                        item.name.charAt(0).toUpperCase() +
                        item.name.slice(1).toLowerCase()
                    )
                    .join(", ")}
                </p>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="specialities">Especialidades *</Label>

                  <p className="font-medium">
                    {profile?.specialities
                      .map((speciality) => speciality.name)
                      .join(", ")}
                  </p>
                  <SpecialitySelect
                    selected={selectedSpecialities}
                    onSpecialityChange={(newSelection) =>
                      setSelectedSpecialities(newSelection)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="healthInsurance">Obra Social *</Label>
                  <HealthInsuranceDoctorSelect
                    selected={selectedHealthInsurances}
                    onHealthInsuranceChange={(newSelection) =>
                      setSelectedHealthInsurances(newSelection)
                    }
                  />
                </div>
              </div> */}
              <h1 className="text-xl font-semibold mt-4 mb-4">Ubicación</h1>
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
                    {...register("address.street")}
                    className="bg-gray-200"
                    defaultValue={profile?.address.street}
                  />
                </div>

                <div>
                  <Label htmlFor="number">N°</Label>
                  <Input
                    {...register("address.number")}
                    className="bg-gray-200"
                    defaultValue={profile?.address.number}
                  />
                </div>
                <div>
                  <Label htmlFor="street">Descripción</Label>
                  <Input
                    {...register("address.description")}
                    className="bg-gray-200"
                    defaultValue={profile?.address.description}
                  />
                </div>
                <div>
                  <Label htmlFor="number">Phone Number </Label>
                  <Input
                    {...register("address.phoneNumber")}
                    className="bg-gray-200"
                    defaultValue={profile?.address.phoneNumber}
                  />
                </div>
              </div>

              {/* </form> */}
            </div>
            <div className="flex flex-wrap items-center justify-center rounded-lg p-4 ">
              <div className="w-full p-4">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
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
    </>
  );
}
