"use client";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import EditDoctorForm from "@/sections/users/doctors/edit/EditDoctorForm";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function EditDoctorPage() {
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
  }, []);

  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (!session || isPatient || isDoctor) {
  //     router.replace("/inicio");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [session, status, router]);

  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }


  if (isLoading) {
    return <Loading isLoading />;
  }
  return (
    // <div className="flex flex-col md:flex-row ">
    //   <div className="md:w-64 w-full"></div>
    //   <div className="flex-grow flex justify-center items-center">
    //   </div>
    // </div>
    <EditDoctorForm doctor={doctor} />
  );
}

export default EditDoctorPage;
