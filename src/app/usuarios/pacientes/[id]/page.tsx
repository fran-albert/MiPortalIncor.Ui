"use client";
import Loading from "@/components/Loading/loading";
import { PatientComponent } from "@/sections/users/patients/CardComponent/component";
import { useParams } from "next/navigation";
import React from "react";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";

function PatientPage() {
  const params = useParams();
  const id = params.id;
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return <PatientComponent id={Number(id)} />;
}

export default PatientPage;
