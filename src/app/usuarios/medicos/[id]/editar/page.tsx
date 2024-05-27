"use client";
import Loading from "@/components/Loading/loading";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import EditDoctorForm from "@/sections/users/doctors/edit/EditDoctorForm";
import { useAuthSecretaryLoading } from "@/hooks/useSecretaryAuthLoading";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function EditDoctorPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const params = useParams();
  const id = params.id;
  const [isLoading2, setIsLoading2] = useState<boolean>(true);
  const doctorRepository = createApiDoctorRepository();
  const loadDoctor = doctorRepository.getDoctor(Number(id));

  const fetchDoctor = async () => {
    try {
      setIsLoading2(true);
      const doctorData = await loadDoctor;
      setDoctor(doctorData ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const { isLoading } = useAuthSecretaryLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return <EditDoctorForm doctor={doctor} />;
}

export default EditDoctorPage;
