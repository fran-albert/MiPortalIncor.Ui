"use client";
import Loading from "@/components/Loading/loading";
import { useAuthSecretaryLoading } from "@/hooks/useSecretaryAuthLoading";
import CreateDoctorForm from "@/sections/users/doctors/create/CreateDoctorForm";
import React from "react";

function AddDoctorPage() {
  const { isLoading } = useAuthSecretaryLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <CreateDoctorForm />
    </>
  );
}

export default AddDoctorPage;
