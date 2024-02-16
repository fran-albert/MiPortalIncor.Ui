"use client";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { SpecialitySelect } from "@/components/Select/Specialty/select";
import { StateSelect } from "@/components/Select/State/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { goBack } from "@/lib/utils";
import React, { useState } from "react";
function AddDoctorForm() {
  const [selectedState, setSelectedState] = useState<string>("");

  return (
    <>
      <div className="flex items-center justify-center bg-white border shadow-2xl rounded-lg p-4 w-1/2">
        <div className="relative p-8 rounded-xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-grow">
              <p className="text-xl font-bold text-center">Agregar Médico</p>
            </div>
          </div>
          <Separator />
          <hr />
          <div className="flex flex-row mt-2">
            <div className="flex-1 pr-1">
              <div className="mb-2 block ">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  name="name"
                  id="name"
                  className="bg-gray-200 text-gray-700"
                  //   value={user?.name || ""}
                />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  name="lastname"
                  className="bg-gray-200 text-gray-700"
                  id="lastname"
                  //  value={user?.lastname || ""}
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
                <Label htmlFor="healthInsurance">Especialidad</Label>
                <SpecialitySelect />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 pr-1">
              <div className="mb-2 block">
                <Label htmlFor="dni">D.N.I.</Label>
                <Input
                  name="dni"
                  className="bg-gray-200 text-gray-700"
                  id="dni"
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
          <div className="flex flex-row mt-2">
            <div className="flex-1 pr-1">
              <div className="mb-2 block ">
                <Label htmlFor="name">Correo Electrónico</Label>
                <Input
                  name="name"
                  id="name"
                  className="bg-gray-200 text-gray-700"
                />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="lastname">N° Matrícula</Label>
                <Input
                  name="lastname"
                  className="bg-gray-200 text-gray-700"
                  id="lastname"
                  value="Matrícula"
                  // defaultValue={user?.lastname || ""}
                />
              </div>
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
            <Button className="mt-10 m-2" variant="teal">
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDoctorForm;
