"use client";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { goBack } from "@/lib/utils";
import { City } from "@/modules/city/domain/City";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { createPatient } from "@/modules/patients/application/create/createPatient";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { State } from "@/modules/state/domain/State";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { toast } from "sonner";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

interface Inputs extends Patient {}

function CreatePatientForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    undefined
  );
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans[] | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthPlans | undefined
  >(undefined);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    console.log("Obra social seleccionada:", healthInsurance);
    setSelectedHealthInsurance(healthInsurance);
    setSelectedPlan(undefined);
  };

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
    console.log("address.city.state set to:", state);
  };

  const handlePlanChange = (plan: HealthPlans) => {
    console.log("Plan de salud seleccionado (handlePlanChange):", plan);
    setSelectedPlan([plan]);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    console.log("Datos del formulario antes de enviar:", data);
    console.log("Plan de salud seleccionado antes de enviar:", selectedPlan);
    formData.append("UserName", data.userName);
    formData.append("FirstName", data.firstName);
    formData.append("LastName", data.lastName);
    formData.append("Email", data.email);
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("BirthDate", data.birthDate.toString());

    if (selectedFile) {
      formData.append("Photo", selectedFile);
    }

    formData.append("Address.Street", data.address?.street);
    formData.append("Address.Number", data.address?.number);
    formData.append("Address.Description", data.address?.description);
    formData.append("Address.PhoneNumber", data.address?.phoneNumber);
    formData.append("Address.City.Id", data.address?.city?.id.toString());
    formData.append("Address.City.Name", data.address?.city?.name);
    formData.append(
      "Address.City.State.Id",
      data.address?.city?.state?.id.toString()
    );
    formData.append("Address.City.State.Name", data.address?.city?.state?.name);
    formData.append(
      "Address.City.State.Country.Id",
      data.address?.city?.state?.country?.id.toString()
    );
    formData.append(
      "Address.City.State.Country.Name",
      data.address?.city?.state?.country?.name
    );
    selectedPlan?.forEach((plan, index) => {
      formData.append(`HealthPlans[${index}][id]`, plan.id.toString());
      formData.append(`HealthPlans[${index}][name]`, plan.name);
    });

    try {
      const patientRepository = createApiPatientRepository();
      const createPatientFn = createPatient(patientRepository);
      const patientCreationPromise = createPatientFn(formData);

      toast.promise(patientCreationPromise, {
        loading: "Creando paciente...",
        success: "Paciente creado con éxito!",
        error: "Error al crear el Paciente",
      });

      patientCreationPromise
        .then(() => {
          goBack();
        })
        .catch((error) => {
          console.error("Error al crear el paciente", error);
        });
    } catch (error) {
      console.error("Error al crear el paciente", error);
    }
  };

  useEffect(() => {
    console.log("Obra social cambiada, reseteando el plan seleccionado");
    setSelectedPlan(undefined);
  }, [selectedHealthInsurance]);

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

  const handleDateChange = (date: any) => {
    const dateInISOFormat = date.toISOString();
    setStartDate(dateInISOFormat);
    setValue("birthDate", dateInISOFormat);
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
              Agregar Paciente
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

                <div>
                  <Label htmlFor="dni">D.N.I. *</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
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

export default CreatePatientForm;
