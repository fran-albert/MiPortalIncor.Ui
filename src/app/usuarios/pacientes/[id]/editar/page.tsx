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
  return <EditPatientForm patient={patient} />;
}

export default EditPatientPage;
