"use client";
import Loading from "@/components/Loading/loading";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import EditPatientForm from "@/sections/users/patients/edit/EditPatientForm";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function EditPatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const patientRepository = createApiPatientRepository();
  const loadPatient = patientRepository.getPatient(Number(id));

  const fetchPatient = async () => {
    try {
      setIsLoading(true);
      const patientData = await loadPatient;
      setPatient(patientData ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  if (isLoading) {
    return <Loading isLoading />;
  }
  return (
    <div className="flex flex-col md:flex-row bg-gray-200">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-36 p-10 flex justify-center items-center">
        <EditPatientForm patient={patient} />
      </div>
    </div>
  );
}

export default EditPatientPage;
