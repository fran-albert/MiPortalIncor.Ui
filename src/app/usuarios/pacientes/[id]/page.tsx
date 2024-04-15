"use client";
import Loading from "@/components/Loading/loading";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllStudyByPatient } from "@/modules/study/application/get-all-by-patient/getAllStudyByPatient";
import { Study } from "@/modules/study/domain/Study";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
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
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const patientRepository = createApiPatientRepository();
  const studyRepository = createApiStudyRepository();
  const [studies, setStudies] = useState<Study[]>([]);
  const [urls, setUrls] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const loadPatient = getPatient(patientRepository);
        const patientResult = await loadPatient(Number(id));
        setPatient(patientResult);

        if (patientResult) {
          const loadStudies = getAllStudyByPatient(studyRepository);
          const studiesResult = await loadStudies(Number(id));
          setStudies(studiesResult);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [Number(id)]);
  

  const handleAddStudy = (newStudy: Study) => {
    setStudies(prevStudies => [...prevStudies, newStudy]);
  };

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:ml-20 bg-slate-50 min-h-screen lg:ml-16">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-24 p-3 md:p-0 ">
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
                <StudiesCardComponent
                  studies={studies}
                  idPatient={Number(patient?.userId)}
                  onStudyAdded={handleAddStudy}
                />
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
