"use client";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { goBack } from "@/lib/utils";
import { createPatient } from "@/modules/patients/application/create/createPatient";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
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
  } = useForm<Inputs>();
  const [selectedState, setSelectedState] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const patientRepository = createApiPatientRepository();
      const createPatientFn = createPatient(patientRepository);
      const patientCreationPromise = createPatientFn(data);

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

  return (
    <>
      <div className="flex items-center justify-center bg-white border shadow-2xl rounded-lg p-4 w-1/2">
        <div className="relative p-8 rounded-xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-grow">
              <p className="text-xl font-bold text-center">Agregar Paciente</p>
            </div>
          </div>
          <Separator />
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row mt-2">
              <div className="flex-1 pr-1">
                <div className="mb-2 block ">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    {...register("firstName", { required: true })}
                    className="bg-gray-200 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex-1 pl-1">
                <div className="mb-2 block">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    {...register("lastName", { required: true })}
                    className="bg-gray-200 text-gray-700"
                  />
                  <Input
                    {...register("photo", { required: true })}
                    className="bg-gray-200 text-gray-700"
                    defaultValue="photo"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1 pr-1">
                <div className="mb-2 block">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    name="phone"
                    className="bg-gray-200 text-gray-700"
                    id="phone"
                  />
                </div>
              </div>
              <div className="flex-1 pl-1">
                <div className="mb-2 block">
                  <Label htmlFor="healthInsurance">Obra Social</Label>
                  <HealthInsuranceSelect />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1 pr-1">
                <div className="mb-2 block">
                  <Label htmlFor="userName">D.N.I.</Label>
                  <Input
                    className="bg-gray-200 text-gray-700"
                    id="userName"
                    {...register("userName", { required: true })}
                    //  defaultValue={user?.dni ? formatearDNI(user.dni) : ""}
                  />
                </div>
              </div>
              <div className="flex-1 pl-1">
                <div className="mb-2 block">
                  <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                  <Input
                    name="birthdate"
                    id="birthdate"
                    className="bg-gray-200 text-gray-700"
                    //  value={user?.birthDate ? formatDate(user.birthDate) : ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1 pr-1">
                <div className="mb-2 block">
                  <Label htmlFor="state">Provincia</Label>
                  <StateSelect
                    selected={selectedState}
                    onStateChange={setSelectedState}
                  />
                </div>
              </div>
              <div className="flex-1 pl-1">
                <div className="mb-2 block">
                  <Label htmlFor="city">Localidad</Label>
                  <CitySelect idState={selectedState} />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  className="bg-gray-200 text-gray-700"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-10 m-2"
                variant="destructive"
                onClick={goBack}
              >
                Cancelar
              </Button>
              <Button className="mt-10 m-2" variant="teal" type="submit">
                Agregar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePatientForm;
