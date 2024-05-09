"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { capitalizeWords } from "@/common/helpers/helpers";
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
import { FaCalendar } from "react-icons/fa6";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
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
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  const handleCityChange = (city: City) => {
    if (selectedState) {
      const cityWithState = { ...city, state: selectedState };
      setSelectedCity(cityWithState);
      setValue("address.city", cityWithState);
    }
  };

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setValue("address.city.state", state);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Doctor) => {
    if (!selectedCity) {
      return;
    }

    const payload: Doctor = {
      ...data,
      specialities: selectedSpecialities.map((speciality) => ({
        id: speciality.id,
        name: speciality.name,
      })),
      healthInsurances: selectedHealthInsurances,
      address: {
        ...data.address,
        city: selectedCity,
      },
      photo: "",
    };

    console.log("Payload", payload);

    try {
      const doctorRepository = createApiDoctorRepository();
      const createDoctorFn = createDoctor(doctorRepository);
      const doctorCreationPromise = createDoctorFn(payload);
      toast.promise(doctorCreationPromise, {
        loading: "Creando médico...",
        success: "Médico creado con éxito!",
        error: "Error al crear el Médico",
      });

      doctorCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al crear el médico", error);
        });
    } catch (error) {
      console.error("Error al crear el doctor", error);
    }
  };

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("birthDate", formattedDateISO);
  };

  return (
    <>
      {/* <div className="w-1/2 p-6 mt-28 items-center justify-center border shadow-xl rounded-lg max-w-4xl mx-auto bg-white">
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
                  "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
                alt="Imagen del Médico"
                width={100}
                height={100}
                className="rounded-2xl"
              />
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
      </div> */}
      <div key="1" className="w-full">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>
                <button
                  className="flex items-center justify-start w-full"
                  onClick={goBack}
                  type="button"
                >
                  <IoMdArrowRoundBack className="text-black mr-2" size={25} />
                  Agregar Médico
                </button>
              </CardTitle>
              <CardDescription>
                Completa los campos para agregar un nuevo médico.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                {/* <div className="col-span-2 flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  alt="Patient Avatar"
                  src="/placeholder-avatar.jpg"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Button variant="outline">Upload Photo</Button>
            </div> */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Ingresar nombre"
                    {...register("firstName", {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres",
                      },
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("firstName", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Ingresar apellido"
                    {...register("lastName", {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El apellido debe tener al menos 2 caracteres",
                      },
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("lastName", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">D.N.I.</Label>
                    <Input
                      id="username"
                      placeholder="Ingresar D.N.I."
                      {...register("userName", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "El D.N.I. debe contener solo números",
                        },
                      })}
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-xs italic">
                        {errors.userName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input
                      id="matricula"
                      type="matricula"
                      placeholder="Ingresar matrícula"
                      {...register("matricula", {
                        onChange: (e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setValue("matricula", capitalized, {
                            shouldValidate: true,
                          });
                        },
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "La matrícula debe contener solo números",
                        },
                      })}
                    />
                    {errors.matricula && (
                      <p className="text-red-500 text-xs italic">
                        {errors.matricula.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Fecha de Nacimiento</Label>
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={handleDateChange}
                    locale="es"
                    className="max-w-full"
                    icon={<FaCalendar color="#0f766e" />}
                    customInput={<Input className="input-custom-style" />}
                    dateFormat="d MMMM yyyy"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    placeholder="Ingresar correo electrónico"
                    {...register("email", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Introduce un correo electrónico válido",
                      },
                    })}
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="Ingresar teléfono"
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El teléfono debe contener solo números",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs italic">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="healthCareProvider">Obra Social</Label>
                  <HealthInsuranceDoctorSelect
                    selected={selectedHealthInsurances}
                    onHealthInsuranceChange={(newSelection) =>
                      setSelectedHealthInsurances(newSelection)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthInsurancePlan">Especialidades</Label>
                  <SpecialitySelect
                    selected={selectedSpecialities}
                    onSpecialityChange={(newSelection) =>
                      setSelectedSpecialities(newSelection)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state">Provincia</Label>
                  <StateSelect
                    selected={selectedState}
                    onStateChange={handleStateChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <CitySelect
                    idState={selectedState?.id}
                    onCityChange={handleCityChange}
                    selected={selectedCity}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="street">Calle</Label>
                  <Input
                    id="street"
                    placeholder="Ingresar calle"
                    {...register("address.street", {
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("address.street", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">N°</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Ingresar número"
                    {...register("address.number", {
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("address.number", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Piso</Label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="Ingresar piso"
                    {...register("address.description", {
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("address.description", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    placeholder="Ingresar departamento"
                    {...register("address.phoneNumber", {
                      onChange: (e) => {
                        const capitalized = capitalizeWords(e.target.value);
                        setValue("address.phoneNumber", capitalized, {
                          shouldValidate: true,
                        });
                      },
                    })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={goBack}>
                Cancelar
              </Button>
              <Button variant="teal" type="submit">
                Confirmar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default CreateDoctorForm;
