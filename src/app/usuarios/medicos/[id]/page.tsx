"use client";
import Loading from "@/components/Loading/loading";
import { DoctorComponent } from "@/components/component/doctor-component";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";
import { useParams } from "next/navigation";
import React from "react";

function DoctorPage() {
  const params = useParams();
  const id = params.id;
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }
  return <DoctorComponent id={Number(id)} />;
}

export default DoctorPage;
