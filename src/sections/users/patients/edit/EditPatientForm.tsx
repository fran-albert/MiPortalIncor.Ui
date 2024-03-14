"use client";
import { formatDni } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { HealthPlanSelect } from "@/components/Select/HealthPlan/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { goBack } from "@/lib/utils";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { User } from "@/modules/users/domain/User";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

function EditPatientForm({ patient }: { patient: Patient | null }) {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<User>();

  const patientRepository = createApiPatientRepository();
  const loadPatient = getPatient(patientRepository);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = Number(id);
        const userData = await loadPatient(userId);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="w-full p-6 mt-20">
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
            {patient?.firstName} {patient?.lastName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center rounded-lg">
          <div className="w-full p-4">
            <h1 className="text-xl font-semibold mb-4">Datos Personales</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  defaultValue={patient?.firstName}
                />
              </div>

              <div>
                <Label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </Label>
                <Input
                  id="lastname"
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  type="text"
                  defaultValue={patient?.lastName}
                />
              </div>

              <div>
                <Label htmlFor="dni">D.N.I.</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                  defaultValue={patient?.dni ? formatDni(patient?.dni) : ""}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="healthCare">Fecha de Nacimiento</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 cursor-not-allowed"
                  defaultValue={patient?.birthDate.toString()}
                  readOnly
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Contacto</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  // {...register("email")}
                  defaultValue={patient?.email}
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  // {...register("phone", { required: true })}
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  defaultValue={patient?.phoneNumber}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Ubicación</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="state">Provincia</Label>
                <StateSelect
                // selected={selectedState}
                // onStateChange={handleStateChange}
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <CitySelect
                // idState={selectedState?.id}
                // selected={selectedCity}
                //   onCityChange={handleCityChange}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Dirección</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Label htmlFor="street">Calle</Label>
                <Input
                  // {...register("address.street")}
                  className="bg-gray-200"
                  defaultValue={patient?.address.street}
                />
              </div>

              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  // {...register("address.number")}
                  className="bg-gray-200"
                  defaultValue={patient?.address.number}
                />
              </div>
              <div>
                <Label htmlFor="street">Piso</Label>
                <Input
                  // {...register("address.description")}
                  className="bg-gray-200"
                  defaultValue={patient?.address.description}
                />
              </div>
              <div>
                <Label htmlFor="street">Departamento *</Label>
                <Input
                  // {...register("address.description")}
                  className="bg-gray-200"
                  defaultValue={patient?.address.description}
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-4">Seguro Médico</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Obra Social</Label>
                <HealthInsuranceSelect
                // selected={selectedHealthInsurance}
                // onHealthInsuranceChange={handleHealthInsuranceChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Plan</Label>
                <HealthPlanSelect
                // selected={selectedHealthPlan}
                // onHealthPlanChange={handleHealthPlanChange}
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
              <Button className="mt-10 m-2" variant="teal">
                Confirmar
              </Button>
            </div>
          </div>
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      </div>
    </>
  );
}

export default EditPatientForm;
