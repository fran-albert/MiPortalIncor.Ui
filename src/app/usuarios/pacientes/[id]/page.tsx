"use client";
import Loading from "@/components/Loading/loading";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import AppointmentCardComponent from "@/sections/users/patients/View/Appointment/card";
import UserCardComponent from "@/sections/users/patients/View/Card/card";
import DataProfileCard from "@/sections/users/patients/View/Data/card";
import HistoryCardComponent from "@/sections/users/patients/View/History/card";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
import VaccineComponent from "@/sections/users/patients/View/Vaccine/card";
import VitalSignCard from "@/sections/users/patients/View/VitalSigns/card";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function PatientPage() {
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
    <>
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-24 p-3 md:p-0 bg-slate-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 md:mr-3">
              <div className="m-4">
                <UserCardComponent patient={patient} />
              </div>
              <div className="m-4">
                <DataProfileCard patient={patient} />
              </div>
              <div className="m-4">{/* <VitalSignCard /> */}</div>
              <div className="m-4">{/* <StudiesCardComponent /> */}</div>
            </div>
            <div className="flex-1 md:mt-0 mt-3">
              <div className="m-4">
                {/* <HistoryCardComponent /> */}
                <StudiesCardComponent patient={patient} />
              </div>
              <div className="m-4">{/* <VaccineComponent /> */}</div>
            </div>
            <div className="flex-1 md:mt-0 mt-3">
              <div className="m-4">{/* <AppointmentCardComponent /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientPage;
