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
import { City } from "@/modules/city/domain/City";
import { createDoctor } from "@/modules/doctors/application/create/createDoctor";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { State } from "@/modules/state/domain/State";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface Inputs extends Doctor {}

function CreateDoctorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [selectedState, setSelectedState] = useState<State | undefined>(
    undefined
  );
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      specialities: selectedSpecialities.map((speciality) => ({
        id: parseInt(speciality.id), // Asegurándonos de que el id es un número si es necesario
        name: speciality.name,
      })),
    };

    console.log(payload);
    // try {
    //   const doctorRepository = createApiDoctorRepository();
    //   const createDoctorFn = createDoctor(doctorRepository);
    //   const doctorCreationPromise = createDoctorFn(data);
    //   toast.promise(doctorCreationPromise, {
    //     loading: "Creando médico...",
    //     success: "Médico creado con éxito!",
    //     error: "Error al crear el Médico",
    //   });

    //   doctorCreationPromise
    //     .then(() => {
    //       goBack();
    //     })
    //     .catch((error) => {
    //       console.error("Error al crear el médico", error);
    //     });
    // } catch (error) {
    //   console.error("Error al crear el doctor", error);
    // }
  };

  // const onSpecialityChange = (selectedSpecialities: Speciality[]) => {
  //   // Extrae solo los IDs (strings) de las especialidades seleccionadas
  //   const specialityIds: string[] = selectedSpecialities.map(
  //     (speciality) => speciality.id
  //   );

  //   setSelectedSpecialities(specialityIds);

  //   // Asumiendo que tu backend espera un array de IDs (strings) para las especialidades
  //   setValue("specialities", specialityIds);
  // };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Usamos setValue de react-hook-form para actualizar el campo
        setValue("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setValue("address.city", city);
  };

  const handleStateChange = (state: State) => {
    setSelectedState(state);
    setValue("address.city.state", state);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-white border shadow-xl rounded-lg p-6 w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="text-2xl font-bold text-center mb-6">
            Agregar Médico
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                {...register("firstName", { required: true })}
                type="text"
              />
            </div>

            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input {...register("lastName", { required: true })} />
            </div>
            <div>
              <Label htmlFor="matricula">Matrícula N°</Label>
              <Input {...register("matricula", { required: true })} />
            </div>
            <div>
              <Label htmlFor="photo">Imagen</Label>
              <Input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="userName">D.N.I.</Label>
              <Input {...register("userName", { required: true })} />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Télefono</Label>
              <Input {...register("phoneNumber", { required: true })} />
            </div>
            <div>
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input {...register("birthDate", { required: true })} />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input {...register("email", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="specialities">Especialidades</Label>
              <SpecialitySelect
                selected={selectedSpecialities}
                onSpecialityChange={(newSelection) =>
                  setSelectedSpecialities(newSelection)
                }
              />
            </div>
            <div>
              <Label htmlFor="healthInsurance">Obra Social</Label>
              <HealthInsuranceSelect />
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
              <Label htmlFor="city">Localidad</Label>
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
              <Input {...register("address.street")} />
            </div>

            <div>
              <Label htmlFor="number">N°</Label>
              <Input {...register("address.number")} />
            </div>
            <div>
              <Label htmlFor="street">Descripción</Label>
              <Input {...register("address.description")} />
            </div>
            <div>
              <Label htmlFor="number">Phone Number 2 </Label>
              <Input {...register("address.phoneNumber")} />
            </div>
          </div>

          <div className="flex justify-center gap-4">
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

export default CreateDoctorForm;
