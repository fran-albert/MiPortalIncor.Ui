"use client";
import { formatDni } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { SpecialitySelect } from "@/components/Select/Specialty/select";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { State } from "@/modules/state/domain/State";
import { User } from "@/modules/users/domain/User";
import { useParams } from "next/navigation";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { updateDoctor } from "@/modules/doctors/application/update/updateDoctor";
import { toast } from "sonner";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { getDoctor } from "@/modules/doctors/application/get/getDoctor";
import { HealthInsuranceDoctorSelect } from "@/components/Select/Health Insurance/selectDoctor";
import { goBack } from "@/lib/utils";

interface Inputs extends Doctor {}

function EditDoctorForm({ doctor }: { doctor: Doctor | null }) {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<Doctor>();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >([]);

  const doctorRepository = createApiDoctorRepository();
  const loadDoctor = getDoctor(doctorRepository);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = Number(id);
        const userData = await loadDoctor(userId);
        setSelectedState(userData?.address?.city.state);
        setSelectedCity(userData?.address?.city);
        setSelectedSpecialities(
          userData?.specialities.map((s) => s.speciality)
        );
        setSelectedHealthInsurances(userData?.healthInsurances || []);
        setUser(userData);
      } catch (error) {
        console.log(error);
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

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const specialitiesToSend = selectedSpecialities.map((s) => ({
      id: s.id,
      name: s.name,
    }));
    const healthInsuranceToSend = selectedHealthInsurances.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    const { address, ...rest } = data;
    const formattedUserName = removeDotsFromDni(data.userName);
    const addressToSend = {
      ...address,
      id: user?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };

    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      specialities: specialitiesToSend,
      healthInsurances: healthInsuranceToSend,
      photo: "photo",
    };

    try {
      const doctorRepository = createApiDoctorRepository();
      const updateDoctorFn = updateDoctor(doctorRepository);
      const doctorCreationPromise = updateDoctorFn(dataToSend, Number(id));

      toast.promise(doctorCreationPromise, {
        loading: "Actualizando médico...",
        success: "Médico actualizado con éxito!",
        error: "Error al actualizar el médico",
      });

      doctorCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al actualizar el médico", error);
        });
    } catch (error) {
      console.error("Error al actualizar el médico", error);
    }
  };

  return (
    <>
      <div className="w-1/2 p-6 mt-28 items-center justify-center border shadow-xl rounded-lg max-w-4xl mx-auto bg-white">
        <div className="my-4">
          <div className="flex items-center justify-center text-black font-bold text-xl">
            <button
              className="flex items-center justify-start py-2 px-4 w-full"
              onClick={() => window.history.back()}
            >
              <IoMdArrowRoundBack className="text-black mr-2" size={24} />
              Editar Médico
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            {/* <div className="group rounded-2xl overflow-hidden">
              <img
                src={
                  imagePreviewUrl ||
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
                  onClick={() => inputFileRef?.current?.click()}
                >
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputFileRef}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div> */}
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
                {doctor?.firstName} {doctor?.lastName}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center rounded-lg">
          <div className="w-full p-4">
            <h1 className="text-xl font-semibold mb-4">Datos Personales</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    defaultValue={doctor?.firstName}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
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
                    defaultValue={doctor?.lastName}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="matricula">Matrícula N°</Label>
                      <Input
                        {...register("matricula", { required: true })}
                        defaultValue={doctor?.matricula}
                        className="w-full bg-gray-200 border-gray-300 text-gray-800"
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
                    defaultValue={formatDni(String(doctor?.dni))}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
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
                    defaultValue={doctor?.email}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    {...register("phoneNumber", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={doctor?.phoneNumber}
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-4">Ubicación</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="state">Provincia *</Label>
                  <StateSelect
                    selected={selectedState}
                    onStateChange={handleStateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <CitySelect
                    idState={selectedState?.id}
                    onCityChange={handleCityChange}
                    selected={selectedCity}
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
                    defaultValue={doctor?.address.street}
                  />
                </div>

                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    {...register("address.number")}
                    defaultValue={doctor?.address.number}
                    className="bg-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Piso</Label>
                  <Input
                    {...register("address.description")}
                    defaultValue={doctor?.address.description}
                    className="bg-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Departamento</Label>
                  <Input
                    {...register("address.phoneNumber")}
                    className="bg-gray-200"
                    defaultValue={doctor?.address.phoneNumber}
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-4">Seguro Médico</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Obra Social</Label>
                  <HealthInsuranceDoctorSelect
                    selected={selectedHealthInsurances}
                    onHealthInsuranceChange={(newSelection) =>
                      setSelectedHealthInsurances(newSelection)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="specialities">Especialidades</Label>
                  <SpecialitySelect
                    selected={selectedSpecialities}
                    onSpecialityChange={(newSelection) =>
                      setSelectedSpecialities(newSelection)
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  className="mt-10 m-2"
                  variant="destructive"
                  onClick={goBack}
                >
                  Cancelar
                </Button>
                <Button className=" m-2" variant="teal">
                  Confirmar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDoctorForm;
