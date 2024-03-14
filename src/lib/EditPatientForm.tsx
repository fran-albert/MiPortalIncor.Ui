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
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { User } from "@/modules/users/domain/User";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";

function EditPatientForm({ patient }: { patient: Patient | null }) {
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
      {/* <div className="flex items-center justify-center bg-white border shadow-2xl rounded-lg p-4 w-1/2">
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
      </div> */}
      <div className="flex flex-col items-center text-center py-6">
        <div className="relative mb-3">
          {/* Image Container */}
          <div className="group rounded-2xl overflow-hidden">
            {/* {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="patient Picture"
                    className="rounded-2xl"
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  <img
                    src={
                      session?.user?.photo
                        ? `https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/${session.user.photo}.jpeg`
                        : "https://mirankingtenis.s3.us-east-1.amazonaws.com/storage/avatar/default2.png"
                    }
                    alt="patient Picture"
                    width={100}
                    height={100}
                    className="rounded-2xl"
                  />
                )} */}

            <img
              src={
                "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              alt="patient Picture"
              width={100}
              height={100}
              className="rounded-2xl"
            />
            {/* Edit Icon Container */}
            <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <div
                className="bg-gray-500 p-2 rounded-full cursor-pointer"
                // onClick={handleEditPictureClick}
              >
                <FaPencilAlt className="text-white" />
              </div>
            </div>
            {/* Hidden File Input */}
            {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                // / */}
          </div>
        </div>
        <h3 className="text-xl font-medium">
          {patient?.firstName} {patient?.lastName}
        </h3>
      </div>
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap items-center justify-center rounded-lg p-4 ">
          <div className="w-full p-4">
            <div className="container mx-auto p-6">
              <div className="bg-white rounded-lg shadow-md p-6">
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
                    <Input
                      className="w-full bg-gray-200 border-gray-300 text-gray-800"
                      // {...register("email")}
                      defaultValue={patient?.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Plan</Label>
                    <Input
                      // {...register("phone", { required: true })}
                      className="w-full bg-gray-200 border-gray-300 text-gray-800"
                      defaultValue={patient?.phoneNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4"></div>
            <h1 className="">Contacto</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatientForm;
