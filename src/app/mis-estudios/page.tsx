"use client";
import React, { useEffect, useState } from "react";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { getAllStudyByPatient } from "@/modules/study/application/get-all-by-patient/getAllStudyByPatient";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { Patient } from "@/modules/patients/domain/Patient";
import { getPatient } from "@/modules/patients/application/get/getPatient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRoles from "@/hooks/useRoles";
import { MyStudiesComponent } from "@/sections/users/patients/MyStudies/component";
import Loading from "@/components/Loading/loading";
import { Study } from "@/modules/study/domain/Study";

interface UrlMap {
  [key: number]: string;
}

const studyRepository = createApiStudyRepository();
const patientRepository = createApiPatientRepository();

function StudiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const userId = session?.user.id;
  const [labs, setLabs] = useState<Study[]>([]);
  const [ecography, setEcography] = useState<Study[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [urls, setUrls] = useState<UrlMap>({});
  const [areUrlsLoaded, setAreUrlsLoaded] = useState<boolean>(false);

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

          const labs = studiesResult.filter(
            (study) => study.studyType?.name === "Laboratorio"
          );
          const ecography = studiesResult.filter(
            (study) => study.studyType?.name === "Ecografía"
          );

          setLabs(labs);
          setEcography(ecography);

          // Fetch URLs
          const newUrls: UrlMap = {};
          await Promise.all(
            studiesResult.map(async (study) => {
              const url = await studyRepository.getUrlByPatient(
                userId,
                study.locationS3
              );
              newUrls[study.id] = url;
            })
          );
          setUrls(newUrls);
          setAreUrlsLoaded(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (!session || isSecretary || isDoctor) {
  //     router.replace("/inicio");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [session, status, router]);

  if (isLoading || status === "loading" || !areUrlsLoaded) {
    return <Loading isLoading={true} />;
  }

  return <MyStudiesComponent labs={labs} ecography={ecography} urls={urls} />;
}

export default StudiesPage;
