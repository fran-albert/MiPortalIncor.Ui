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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { updatePatient } from "@/modules/patients/application/update/updatePatient";
import { toast } from "sonner";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
registerLocale("es", es);
interface Inputs extends Patient {}

function EditPatientForm({ patient }: { patient: Patient | null }) {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<Patient>();
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedHealthInsurance, setSelectedHealthInsurance] =
    useState<HealthInsurance>();
  const [selectedPlan, setSelectedPlan] = useState<HealthPlans[] | undefined>(
    undefined
  );
  const patientRepository = createApiPatientRepository();
  const loadPatient = useMemo(
    () => patientRepository.getPatient(Number(id)),
    [id]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [isPatientLoaded, setIsPatientLoaded] = useState(false);
  const removeDotsFromDni = (dni: any) => dni.replace(/\./g, "");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await loadPatient;
        setSelectedState(userData?.address?.city.state);
        setSelectedCity(userData?.address?.city);
        setSelectedHealthInsurance(userData?.healthPlans[0]?.healthInsurance);
        // setSelectedPlan(userData?.healthPlans[0]);
        setUser(userData);
        if (!isPatientLoaded) {
          const birthDate = new Date(String(userData?.birthDate));
          setStartDate(birthDate);
          setIsPatientLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [id, loadPatient]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleStateChange = (state: State) => {
    setSelectedState(state);
  };

  const handleCityChange = (city: City) => {
    if (selectedState) {
      const cityWithState = { ...city, state: selectedState };
      setSelectedCity(cityWithState);
      setValue("address.city", cityWithState);
    }
  };

  const handleHealthInsuranceChange = (healthInsurance: HealthInsurance) => {
    setSelectedHealthInsurance(healthInsurance);
  };

  const handlePlanChange = (plan: HealthPlans) => {
    console.log("Plan de salud seleccionado (handlePlanChange):", plan);
    setSelectedPlan([plan]);
  };

  console.log(patient);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    console.log("Datos del formulario antes de enviar:", data);
    console.log("Plan de salud seleccionado antes de enviar:", selectedPlan);
    formData.append("UserName", data.userName);
    formData.append(
      "FirstName",
      data.firstName.charAt(0).toUpperCase() +
        data.firstName.slice(1).toLowerCase()
    );
    formData.append(
      "LastName",
      data.lastName.charAt(0).toUpperCase() +
        data.lastName.slice(1).toLowerCase()
    );

    console.log(data.birthDate, "cumpleaños");

    formData.append("Email", data.email.toLowerCase());
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
      const updatePatientFn = updatePatient(patientRepository);
      const patientCreationPromise = updatePatientFn(formData, Number(id));

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

  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date); // Actualiza startDate con la nueva fecha seleccionada
    setValue("birthDate", formattedDateISO); // Asegura que el valor en el formulario también se actualice
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
              Editar Paciente
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="group rounded-2xl overflow-hidden">
              <img
                src={
                  patient?.photo
                    ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
                    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
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
                    defaultValue={patient?.firstName}
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
                    defaultValue={patient?.lastName}
                  />
                </div>

                <div>
                  <Label htmlFor="dni">D.N.I. *</Label>
                  <Input
                    className="w-full bg-gray-200 border-gray-300 text-gray-800"
                    defaultValue={patient?.dni ? formatDni(patient?.dni) : ""}
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
                    defaultValue={patient?.email}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
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
                  <Label htmlFor="street">Departamento</Label>
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

export default EditPatientForm;
