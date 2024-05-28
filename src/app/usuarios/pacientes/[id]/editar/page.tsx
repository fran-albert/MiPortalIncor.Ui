"use client";
import Loading from "@/components/Loading/loading";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";
import EditPatientForm from "@/sections/users/patients/edit/EditPatientForm";
import { useParams } from "next/navigation";
import React from "react";

function EditPatientPage() {
  const params = useParams();
  const id = params.id;
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading />;
  }
  return <EditPatientForm id={Number(id)} />;
}

export default EditPatientPage;
