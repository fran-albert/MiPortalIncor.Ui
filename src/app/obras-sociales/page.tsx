"use client";
import Loading from "@/components/Loading/loading";
import { HealthInsuranceTable } from "@/sections/users/secretary/HealthCare/table/table";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";
import React, { useEffect, useState } from "react";

function HealthCarePage() {
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <div>
      <HealthInsuranceTable />
    </div>
  );
}

export default HealthCarePage;
