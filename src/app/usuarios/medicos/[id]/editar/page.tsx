"use client";
import Loading from "@/components/Loading/loading";
import EditDoctorForm from "@/sections/users/doctors/edit/EditDoctorForm";
import { useAuthSecretaryLoading } from "@/hooks/useSecretaryAuthLoading";
import { useParams } from "next/navigation";
import React from "react";

function EditDoctorPage() {
  const params = useParams();
  const id = params.id;
  const { isLoading } = useAuthSecretaryLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return <EditDoctorForm id={Number(id)} />;
}

export default EditDoctorPage;
