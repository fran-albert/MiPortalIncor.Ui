"use client";
import { formatDni } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { goBack } from "@/lib/utils";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { State } from "@/modules/state/domain/State";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
import { toast } from "sonner";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
registerLocale("es", es);
interface Inputs extends Patient {}

interface Inputs {
  [key: string]: any;
}

interface Patient {
  [key: string]: any;
}

function EditPatientForm({ patient }: { patient: Patient | null }) {
  const [selectedState, setSelectedState] = useState<State | undefined>(
    patient?.address?.city?.state
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    patient?.address?.city
  );
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthInsurance | undefined
  >(patient?.healthPlans?.[0]?.healthInsurance);
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | null>(
    patient?.healthPlans?.[0]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [startDate, setStartDate] = useState(
    patient ? new Date(patient.birthDate) : new Date()
  );

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    if (selectedState) {
      const cityWithState = { ...city, state: selectedState };
      setSelectedCity(cityWithState);
      setValue("address.city", cityWithState, { shouldValidate: true });
    }
  };
  useEffect(() => {
    if (patient) {
      setValue("address.city", selectedCity);
      setValue("healthPlans", selectedPlan ? [selectedPlan] : []);
    }
  }, [patient, selectedCity, selectedPlan, setValue]);

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handlePlanChange = (plan: HealthPlans | null) => {
    setSelectedPlan(plan ? plan : null);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { address, ...rest } = data;
    const formattedUserName = removeDotsFromDni(data.userName);
    const addressToSend = {
      ...address,
      id: patient?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };
    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      healthPlans: selectedPlan
        ? [
            {
              id: selectedPlan.id,
              name: selectedPlan.name,
              healthInsurance: {
                id: selectedHealthInsurance?.id || 0,
                name: selectedHealthInsurance?.name || "",
              },
            },
          ]
        : [],
      photo: "photo",
    };

    try {
      const patientRepository = createApiPatientRepository();
      const updatePatientFn = updatePatient(patientRepository);
      const patientCreationPromise = updatePatientFn(
        Number(patient?.userId),
        dataToSend
      );

      toast.promise(patientCreationPromise, {
        loading: "Actualizando datos del paciente...",
        success: "Paciente actualizado con éxito!",
        error: "Error al actualizar el Paciente",
      });

      patientCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al actualizar el paciente", error);
        });
    } catch (error) {
      console.error("Error al actualizar el paciente", error);
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
      <div className="w-1/2 p-6 mt-28 items-center justify-center border shadow-xl rounded-lg max-w-4xl mx-auto bg-white">
        <div className="my-4">
          <div className="flex items-center justify-center text-black font-bold text-xl">
            <button
              className="flex items-center justify-start py-2 px-4 w-full"
              onClick={() => window.history.back()}
            >
              <IoMdArrowRoundBack className="text-black mr-2" size={24} />
              Editar Paciente
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="group rounded-2xl overflow-hidden">
              <img
                src={
                  patient?.photo
                    ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
                    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
                alt="Imagen del Paciente"
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
                    defaultValue={patient?.firstName}
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
                    defaultValue={patient?.lastName}
                  />
                </div>

                <div>
                  <Label htmlFor="dni">D.N.I. *</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.dni ? formatDni(patient?.dni) : ""}
                    {...register("userName", { required: true })}
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

              <h1 className="text-xl font-semibold mb-4">Contacto</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    {...register("email")}
                    defaultValue={patient?.email}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    {...register("phoneNumber", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.phoneNumber}
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
                    defaultValue={patient?.address.street}
                  />
                </div>

                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    {...register("address.number")}
                    className="bg-gray-200"
                    defaultValue={patient?.address.number}
                  />
                </div>
                <div>
                  <Label htmlFor="street">Piso</Label>
                  <Input
                    {...register("address.description")}
                    className="bg-gray-200"
                    defaultValue={patient?.address.description}
                  />
                </div>
                <div>
                  <Label htmlFor="street">Departamento</Label>
                  <Input
                    {...register("address.phoneNumber")}
                    className="bg-gray-200"
                    defaultValue={patient?.address.phoneNumber}
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-4">Seguro Médico</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Obra Social *</Label>
                  <HealthInsuranceSelect
                    onHealthInsuranceChange={handleHealthInsuranceChange}
                    selected={selectedHealthInsurance}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Plan *</Label>
                  <HealthPlanSelect
                    idHealthInsurance={Number(selectedHealthInsurance?.id)}
                    selected={selectedHealthInsurance}
                    onPlanChange={handlePlanChange}
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

export default EditPatientForm;
