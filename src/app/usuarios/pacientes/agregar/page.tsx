"use client";
import useRoles from "@/hooks/useRoles";
import Loading from "@/components/Loading/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CreatePatientForm } from "@/sections/users/patients/create/CreatePatientForm";

function AddPatientPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor, isAdmin } = useRoles();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || (!isSecretary && !isAdmin)) {
      router.replace("/inicio");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router, isSecretary, isAdmin]);

  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      <CreatePatientForm />
    </>
  );
}

export default AddPatientPage;
