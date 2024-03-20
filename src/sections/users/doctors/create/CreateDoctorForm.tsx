"use client";
import { CustomDatePicker } from "@/components/DatePicker";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { HealthInsuranceDoctorSelect } from "@/components/Select/Health Insurance/selectDoctor";
import { SpecialitySelect } from "@/components/Select/Specialty/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Input } from "@/components/ui/input";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import moment from "moment-timezone";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { goBack } from "@/lib/utils";
import { City } from "@/modules/city/domain/City";
import { createDoctor } from "@/modules/doctors/application/create/createDoctor";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { State } from "@/modules/state/domain/State";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";

interface Inputs extends Doctor {}

function CreateDoctorForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    undefined
  );
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setValue("address.city", city);
  };

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setValue("address.city.state", state);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { address, specialities, healthInsurances, ...rest } = data;
    console.log(data.birthDate);
    const addressToSend = {
      ...address,
      city: selectedCity
        ? {
            id: selectedCity.id,
            name: selectedCity.name,
            state: selectedState
              ? {
                  id: selectedState.id,
                  name: selectedState.name,
                  country: {
                    id: selectedState.country.id,
                    name: selectedState.country.name,
                  },
                }
              : undefined,
          }
        : undefined,
    };

    const specialitiesToSend = selectedSpecialities.map((s) => ({
      id: s.id,
      name: s.name,
    }));
    const healthInsuranceToSend = selectedHealthInsurances.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    const payload: any = {
      ...rest,
      address: addressToSend,
      specialities: specialitiesToSend,
      healthInsurances: healthInsuranceToSend,
    };

    // const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //   const formData = new FormData();
    //   console.log("Datos del formulario antes de enviar:", data);
    //   console.log("Plan de salud seleccionado antes de enviar:", selectedPlan);
    //   formData.append("UserName", data.userName);
    //   formData.append("FirstName", data.firstName);
    //   formData.append("LastName", data.lastName);
    //   formData.append("Email", data.email);
    //   formData.append("PhoneNumber", data.phoneNumber);
    //   formData.append("BirthDate", data.birthDate.toString());

    //   if (selectedFile) {
    //     formData.append("Photo", selectedFile);
    //   }

    //   formData.append("Address.Street", data.address?.street);
    //   formData.append("Address.Number", data.address?.number);
    //   formData.append("Address.Description", data.address?.description);
    //   formData.append("Address.PhoneNumber", data.address?.phoneNumber);
    //   formData.append("Address.City.Id", data.address?.city?.id.toString());
    //   formData.append("Address.City.Name", data.address?.city?.name);
    //   formData.append(
    //     "Address.City.State.Id",
    //     data.address?.city?.state?.id.toString()
    //   );
    //   formData.append("Address.City.State.Name", data.address?.city?.state?.name);
    //   formData.append(
    //     "Address.City.State.Country.Id",
    //     data.address?.city?.state?.country?.id.toString()
    //   );
    //   formData.append(
    //     "Address.City.State.Country.Name",
    //     data.address?.city?.state?.country?.name
    //   );
    //   selectedPlan?.forEach((plan, index) => {
    //     formData.append(`HealthPlans[${index}][id]`, plan.id.toString());
    //     formData.append(`HealthPlans[${index}][name]`, plan.name);
    //   });

    //   try {
    //     const patientRepository = createApiPatientRepository();
    //     const createPatientFn = createPatient(patientRepository);
    //     const patientCreationPromise = createPatientFn(formData);

    //     toast.promise(patientCreationPromise, {
    //       loading: "Creando paciente...",
    //       success: "Paciente creado con éxito!",
    //       error: "Error al crear el Paciente",
    //     });

    //     patientCreationPromise
    //       .then(() => {
    //         goBack();
    //       })
    //       .catch((error) => {
    //         console.error("Error al crear el paciente", error);
    //       });
    //   } catch (error) {
    //     console.error("Error al crear el paciente", error);
    //   }
    // };

    // try {
    //   const doctorRepository = createApiDoctorRepository();
    //   const createDoctorFn = createDoctor(doctorRepository);
    //   const doctorCreationPromise = createDoctorFn(payload);
    //   toast.promise(doctorCreationPromise, {
    //     loading: "Creando médico...",
    //     success: "Médico creado con éxito!",
    //     error: "Error al crear el Médico",
    //   });

    //   doctorCreationPromise
    //     .then(() => {
    //       goBack();
    //     })
    //     .catch((error) => {
    //       console.error("Error al crear el médico", error);
    //     });
    // } catch (error) {
    //   console.error("Error al crear el doctor", error);
    // }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleDateChange = (date: Date) => {
    // Convertir la fecha a la zona horaria de Argentina
    const dateInArgentina = moment(date).tz("America/Buenos_Aires");

    // Formatear la fecha en una cadena que mantiene la zona horaria (sin convertir a UTC)
    const formattedDate = dateInArgentina.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    // Ahora `formattedDate` es una cadena que representa la fecha en la zona horaria de Argentina
    setValue("birthDate", formattedDate);
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
              Agregar Médico
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="group rounded-2xl overflow-hidden">
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
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="matricula">Matrícula N°</Label>
                      <Input
                        {...register("matricula", { required: true })}
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
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    {...register("phoneNumber", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  />
                </div>
              </div>
              <h1 className="text-xl font-semibold mb-4">Atributos Médicos</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="specialities">Especialidades *</Label>
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
              </div>
              <h1 className="text-xl font-semibold mt-4 mb-4">Ubicación</h1>
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
                  />
                </div>

                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    {...register("address.number")}
                    className="bg-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Piso</Label>
                  <Input
                    {...register("address.description")}
                    className="bg-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Departamento</Label>
                  <Input
                    {...register("address.phoneNumber")}
                    className="bg-gray-200"
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

export default CreateDoctorForm;
