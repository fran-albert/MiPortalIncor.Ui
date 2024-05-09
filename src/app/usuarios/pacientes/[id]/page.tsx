"use client";
import Loading from "@/components/Loading/loading";
import { PatientCardComponent } from "@/sections/users/patients/CardComponent/component";
import useRoles from "@/hooks/useRoles";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { Patient } from "@/modules/patients/domain/Patient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { getAllStudyByPatient } from "@/modules/study/application/get-all-by-patient/getAllStudyByPatient";
import { Study } from "@/modules/study/domain/Study";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDateWithTime } from "@/common/helpers/helpers";
const userRepository = createApiUserRepository();
const patientRepository = createApiPatientRepository();
const studyRepository = createApiStudyRepository();
function PatientPage() {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registerBy, setRegisterBy] = useState<User | undefined>(undefined);
  const [studies, setStudies] = useState<Study[]>([]);
  const [urls, setUrls] = useState<{ [key: number]: string }>({});
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const [refreshKey, setRefreshKey] = useState(0);
  const registeredById = patient?.registeredById;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (typeof registeredById !== "undefined") {
          const loadUser = getUser(userRepository);
          const loadRegisterBy = await loadUser(Number(registeredById));
          setRegisterBy(loadRegisterBy);
        }
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
  }, [Number(id), refreshKey, patient?.registeredById]);

  const registerByText = registerBy
    ? `${registerBy.firstName} ${registerBy.lastName} - ${formatDateWithTime(
        String(patient?.registrationDate)
      )}`
    : " ";

  const handleAddStudy = (newStudy: Study) => {
    setStudies((prevStudies) => [...prevStudies, newStudy]);
    setRefreshKey((prevKey) => prevKey + 1);
  };
  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:ml-20 bg-slate-50 min-h-screen lg:ml-16">
        <div className="md:w-64 w-full"></div>
        {/* <div className="flex-grow mt-24 p-3 md:p-0 ">
                <AppointmentCardComponent />
        </div> */}
        <PatientCardComponent
          patient={patient}
          studies={studies}
          onStudyAdded={handleAddStudy}
          registerBy={registerByText}
        />
      </div>
    </>
  );
}

export default PatientPage;
