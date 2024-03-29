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
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { State } from "@/modules/state/domain/State";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
import { toast } from "sonner";

interface Inputs extends Patient {}

function EditPatientForm({ patient }: { patient: Patient | null }) {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<Patient>();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedHealthInsurance, setSelectedHealthInsurance] =
    useState<HealthInsurance>();
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans | undefined>(
    undefined
  );
  const patientRepository = createApiPatientRepository();
  const loadPatient = getPatient(patientRepository);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = Number(id);
        const userData = await loadPatient(userId);
        setSelectedState(userData?.address?.city.state);
        setSelectedCity(userData?.address?.city);
        setSelectedHealthInsurance(userData?.healthPlans[0]?.healthInsurance);
        setSelectedPlan(userData?.healthPlans[0]);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  console.log(user)

  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handleHealthPlanChange = (healthPlan: HealthPlans) => {
    setSelectedPlan(healthPlan);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const healthPlansToSend = selectedPlan
      ? [{ id: selectedPlan.id, name: selectedPlan.name }]
      : [];
    const { address, ...rest } = data;
    const formattedUserName = removeDotsFromDni(data.userName);
    const addressToSend = {
      ...address,
      id: user?.address.id,
      city: {
        ...selectedCity,
        state: selectedState,
      },
    };

    const dataToSend: any = {
      ...rest,
      userName: formattedUserName,
      address: addressToSend,
      healthPlans: healthPlansToSend,
      photo: "photo",
    };

    console.log(dataToSend, "datatonsened");

    try {
      const patientRepository = createApiPatientRepository();
      const updatePatientFn = updatePatient(patientRepository);
      const patientCreationPromise = updatePatientFn(dataToSend, Number(id));

      toast.promise(patientCreationPromise, {
        loading: "Actualizando paciente...",
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label
                    htmlFor="name"
                    {...register("firstName", { required: true })}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
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
                    Apellido
                  </Label>
                  <Input
                    {...register("lastName", { required: true })}
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.lastName}
                  />
                </div>

                <div>
                  <Label htmlFor="dni">D.N.I.</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.dni ? formatDni(patient?.dni) : ""}
                    {...register("userName", { required: true })}
                  />
                </div>

                <div>
                  <Label htmlFor="healthCare">Fecha de Nacimiento</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.birthDate.toString()}
                    {...register("birthDate")}
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-4">Contacto</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    {...register("email")}
                    defaultValue={patient?.email}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
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
                  <Label htmlFor="street">Departamento *</Label>
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
                  <Label htmlFor="email">Obra Social</Label>
                  <HealthInsuranceSelect
                    selected={selectedHealthInsurance}
                    onHealthInsuranceChange={handleHealthInsuranceChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Plan</Label>
                  <HealthPlanSelect
                    selected={selectedPlan}
                    idHealthInsurance={Number(selectedHealthInsurance?.id)}
                    onPlanChange={handleHealthPlanChange}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatientForm;
