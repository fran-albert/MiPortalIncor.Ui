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
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | undefined>(
    undefined
  );
  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState<
    HealthPlans | undefined
  >(undefined);

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setValue("address.city", city);
  };

  const handlePlanChange = (plan: HealthPlans) => {
    setSelectedPlan(plan);
  };

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setValue("address.city.state", state);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const healthPlansToSend = selectedPlan
      ? [{ id: selectedPlan.id, name: selectedPlan.name }]
      : [];
    const { address, ...rest } = data;

    const addressToSend = {
      ...address,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };


    const dataToSend: any = {
      ...rest,
      address: addressToSend,
      healthPlans: healthPlansToSend,
    };

    try {
      const patientRepository = createApiPatientRepository();
      const createPatientFn = createPatient(patientRepository);
      const patientCreationPromise = createPatientFn(dataToSend);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center border shadow-xl rounded-lg p-6 w-full max-w-4xl mx-auto bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="text-2xl font-bold text-center mb-6">
            Agregar Paciente
          </div>
          <Separator />
          <div className="text-xl font-bold text-center mt-6 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                {...register("firstName", { required: true })}
                type="text"
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                {...register("lastName", { required: true })}
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="userName">D.N.I.</Label>
              <Input
                {...register("userName", { required: true })}
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="photo">Imagen</Label>
              <Input
                // type="file"
                {...register("photo")}
                onChange={handleImageChange}
                className="bg-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="healthInsurance">Obra Social</Label>
              <HealthInsuranceSelect
                onHealthInsuranceChange={handleHealthInsuranceChange}
                selected={selectedHealthInsurance}
              />
            </div>
            <div>
              <Label htmlFor="healthPlan">Plan</Label>
              <HealthPlanSelect
                idHealthInsurance={Number(selectedHealthInsurance?.id)}
                selected={selectedHealthInsurance}
                onPlanChange={handlePlanChange}
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input {...register("birthDate")} className="bg-gray-200" />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Télefono</Label>
              <Input {...register("phoneNumber")} className="bg-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                onCityChange={handleCityChange}
                selected={selectedCity}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="street">Calle</Label>
              <Input {...register("address.street")} className="bg-gray-200" />
            </div>

            <div>
              <Label htmlFor="number">N°</Label>
              <Input {...register("address.number")} className="bg-gray-200" />
            </div>
            <div>
              <Label htmlFor="street">Descripción</Label>
              <Input
                {...register("address.description")}
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="number">Phone Number 2 </Label>
              <Input
                {...register("address.phoneNumber")}
                className="bg-gray-200"
              />
            </div>
          </div>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            {...register("email", { required: true })}
            className="bg-gray-200"
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePatientForm;
