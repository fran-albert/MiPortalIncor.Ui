"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActionIcon from "@/components/ui/actionIcon";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Patient } from "@/modules/patients/domain/Patient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDni } from "@/common/helpers/helpers";
import { StateSelect } from "@/components/Select/State/select";
import { CitySelect } from "@/components/Select/City/select";

interface EditPatientDialogProps {
  patient: Patient | null;
}

export default function EditPatientDialog({ patient }: EditPatientDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  //   const handleConfirmDelete = async () => {
  //     try {
  //       await axios.delete(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${idCategory}`
  //       );
  //       toast.success("Categoría eliminada correctamente");
  //     } catch (error) {
  //       console.error("Error al eliminar la categoría", error);
  //       toast.error("Error al eliminar la categoría");
  //     } finally {
  //       setIsOpen(false);
  //     }
  //   };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={toggleDialog}>Editar Datos</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
        </DialogHeader>
        <DialogDescription>
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
                    <h1 className="text-xl font-semibold mb-4">
                      Datos Personales
                    </h1>

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
                          defaultValue={
                            patient?.dni ? formatDni(patient?.dni) : ""
                          }
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

                    <h1 className="text-xl font-semibold mb-4">
                      Seguro Médico
                    </h1>
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
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialog}>
            Cancelar
          </Button>
          {/* <Button variant="add" onClick={handleConfirmDelete}> */}
          <Button variant="teal">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
