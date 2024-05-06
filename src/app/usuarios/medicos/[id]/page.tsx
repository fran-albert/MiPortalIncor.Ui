"use client";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import AppointmentCardComponent from "@/sections/users/doctors/View/Appointment/card";
import UserCardComponent from "@/sections/users/doctors/View/Card/card";
import DataProfileCard from "@/sections/users/doctors/View/Data/card";
import HistoryCardComponent from "@/sections/users/doctors/View/History/card";
import StudiesCardComponent from "@/sections/users/doctors/View/Studies/card";
import VaccineComponent from "@/sections/users/doctors/View/Vaccine/card";
import VitalSignCard from "@/sections/users/doctors/View/VitalSigns/card";
import { PatientTable } from "@/sections/users/patients/table/table";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function DoctorPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const doctorRepository = createApiDoctorRepository();
  const loadDoctor = doctorRepository.getDoctor(Number(id));
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const fetchDoctor = async () => {
    try {
      setIsLoading(true);
      const doctorData = await loadDoctor;
      setDoctor(doctorData ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [Number(id)]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || isPatient || isDoctor) {
      router.replace("/inicio");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:ml-8 bg-slate-50 min-h-screen">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-24 p-3 md:p-0 ">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 md:mr-3">
              <div className="m-4">
                <UserCardComponent doctor={doctor} />
              </div>
              <div className="mt-24">
                {/* <StudiesCardComponent /> */}
                {/* <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Apellido
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Edad
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Sexo
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            Jane Cooper
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
            <div className="flex-1 md:mt-0 mt-3">
              <div className="m-4">
                <DataProfileCard doctor={doctor} />
              </div>
              <div className="m-4"></div>
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

export default DoctorPage;
