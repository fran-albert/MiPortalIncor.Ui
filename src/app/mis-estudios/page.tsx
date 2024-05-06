"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/Table/dateTable";
import { columns } from "@/sections/users/patients/labs/table/columns";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { getAllStudyByPatient } from "@/modules/study/application/get-all-by-patient/getAllStudyByPatient";
import { useCustomSession } from "@/context/SessionAuthProviders";
import { Study } from "@/modules/study/domain/Study";
import Loading from "@/components/Loading/loading";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { Patient } from "@/modules/patients/domain/Patient";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRoles from "@/hooks/useRoles";

const studyRepository = createApiStudyRepository();
const patientRepository = createApiPatientRepository();

function StudiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const userId = session?.user.id;
  const [patient, setPatient] = useState<Patient | undefined>();
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const loadPatient = getPatient(patientRepository);
        const patientResult = await loadPatient(userId);
        setPatient(patientResult);

        if (patientResult) {
          const loadStudies = getAllStudyByPatient(studyRepository);
          const studiesResult = await loadStudies(
            Number(patientResult?.userId)
          );
          setStudies(studiesResult);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || isSecretary || isDoctor) {
      router.replace("/inicio");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);
  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow p-10 mt-28">
        <h1 className="text-3xl text-center font-bold mb-10">Mis Estudios</h1>
        <DataTable columns={columns} data={studies} />
      </div>
    </div>
  );
}

export default StudiesPage;
