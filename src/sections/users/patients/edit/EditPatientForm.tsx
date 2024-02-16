"use client";
import { formatDni } from "@/common/helpers/helpers";
import { CitySelect } from "@/components/Select/City/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { StateSelect } from "@/components/Select/State/select";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { goBack } from "@/lib/utils";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { User } from "@/modules/users/domain/User";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

function EditPatientForm() {
  const { data: session } = useSession();

  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<User>();

  const patientRepository = createApiPatientRepository();
  const loadPatient = getPatient(patientRepository);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = Number(id);
        const userData = await loadPatient(userId, session?.accessToken || "");
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-white border shadow-2xl rounded-lg p-4 w-1/2">
        <div className="relative p-8 rounded-xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-grow">
              <p className="text-xl font-bold text-center">Editar Paciente</p>
            </div>
          </div>
          <Separator />
          <hr />
          <div className="flex justify-center mb-4">
            <Avatar>
              <AvatarImage
                src={
                  user?.photo
                    ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${user.photo}`
                    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
              />
              <AvatarFallback>Imagen del Usuario</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              //   onChange={handleFileChange}
            />
            <Button
              variant="ghost"
              aria-label="Take a photo"
              onClick={() => {
                const fileInput = document.getElementById("file");
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              <FaCamera size={20} color="black" />
            </Button>
          </div>
          <div className="flex flex-row mt-2">
            <div className="flex-1 pr-1">
              <div className="mb-2 block ">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  name="name"
                  id="name"
                  className="bg-gray-200 text-gray-700"
                  defaultValue={user?.firstName || ""}
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
                  defaultValue={user?.lastName || ""}
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
                  defaultValue={user?.phoneNumber || ""}
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
                <Label htmlFor="dni">D.N.I.</Label>
                <Input
                  name="dni"
                  className="bg-gray-200 text-gray-700"
                  id="dni"
                  defaultValue={user?.userName ? formatDni(user.userName) : ""}
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
                <StateSelect />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="city">Localidad</Label>
                <CitySelect />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="apellido">Correo Electrónico</Label>
              <Input
                name="email"
                id="email"
                className="bg-gray-200 text-gray-700"
                defaultValue={user?.email || ""}
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
            <Button className="mt-10 m-2" variant="teal">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatientForm;
