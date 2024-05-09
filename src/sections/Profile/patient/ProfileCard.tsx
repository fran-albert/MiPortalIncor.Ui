import { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
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
import ChangePasswordDialog from "../changePassword/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { toast } from "sonner";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
registerLocale("es", es);
interface Inputs extends Patient {}
const userRepository = createApiPatientRepository();

export default function ProfileCardComponent({ id }: { id: number }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [profile, setProfile] = useState<Patient | undefined>();
  const [selectedState, setSelectedState] = useState<State>();

  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >();
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | undefined>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(new Date());
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  useEffect(() => {
    const loadPatient = getPatient(userRepository);
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await loadPatient(id);
        setProfile(userData);
        setSelectedState(userData?.address.city.state);
        setSelectedCity(userData?.address.city);
        setStartDate(new Date(userData?.birthDate ?? new Date()));
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
    setSelectedPlan(healthPlan);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const healthPlansToSend = selectedPlan.map((plan) => ({
    //   id: plan.id,
    //   name: plan.name,
    //   healthInsurance: {
    //     id: plan.healthInsurance.id,
    //     name: plan.healthInsurance.name,
    //   },
    // }));
    const formattedUserName = removeDotsFromDni(data.userName);
    const { address, ...rest } = data;
    const addressToSend = {
      ...address,
      id: profile?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      healthPlans: selectedPlan ? [selectedPlan] : profile?.healthPlans,
      photo: "photo",
    };

    console.log("Data to send", dataToSend);

    try {
      const patientRepository = createApiPatientRepository();
      const updatePatientFn = updatePatient(patientRepository);
      const patientCreationPromise = updatePatientFn(Number(id), dataToSend);

      toast.promise(patientCreationPromise, {
        loading: "Actualizando datos...",
        success: "Datos actualizados con éxito!",
        error: "Error al actualizar los datos",
      });

      patientCreationPromise.catch((error) => {
        console.error("Error al actualizar los datos", error);
      });
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };
  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  if (isLoading) {
    return <Loading isLoading />;
  }

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
                  {/* <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <div
                      className="bg-gray-500 p-2 rounded-full cursor-pointer"
                      onClick={handleEditPictureClick}
                    >
                      <FaPencilAlt className="text-white" />
                    </div>
                  </div> */}
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
                  ? "Médico"
                  : isPatient
                  ? "Paciente"
                  : isSecretary
                  ? "Secretaria"
                  : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center rounded-lg p-4 ">
              <div className="w-full p-4">
                <form onSubmit={handleSubmit(onSubmit)} id="profileForm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        {...register("firstName", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.firstName}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        {...register("lastName", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.lastName}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dni">D.N.I.</Label>
                      <Input
                        className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                        defaultValue={
                          profile?.dni ? formatDni(profile?.dni) : ""
                        }
                        {...register("userName")}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        {...register("email")}
                        defaultValue={profile?.email}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Teléfono</Label>
                      <Input
                        {...register("phoneNumber", { required: true })}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
                        defaultValue={profile?.phoneNumber}
                      />
                    </div>
                    <div>
                      <Label htmlFor="healthCare">Obra Social</Label>
                      <Input
                        className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                        value={profile?.healthPlans?.map((plan) => plan.name)}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="healthCare">Fecha de Nacimiento</Label>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
                        <Label htmlFor="street">Piso</Label>
                        <Input
                          {...register("address.description")}
                          className="bg-gray-200"
                          defaultValue={profile?.address.description}
                        />
                      </div>
                      <div>
                        <Label htmlFor="number">Depto </Label>
                        <Input
                          {...register("address.phoneNumber")}
                          className="bg-gray-200"
                          defaultValue={profile?.address.phoneNumber}
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex justify-center items-center gap-4 mt-10">
                  <Button
                    className="w-full sm:w-auto"
                    variant="outline"
                    form="profileForm"
                    type="submit"
                  >
                    Modificar Datos
                  </Button>
                  <ChangePasswordDialog id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
