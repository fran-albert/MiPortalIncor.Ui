"use client";
import React, { useEffect, useState } from "react";
import { PatientTable } from "@/sections/users/patients/table/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRoles from "@/hooks/useRoles";
import Loading from "@/components/Loading/loading";

const PatientsPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isPatient, isAdmin } = useRoles();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/");
    } else if (isPatient && !isAdmin) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router, isPatient, isAdmin]);

  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }

  return (
    <div>
      <PatientTable />
    </div>
  );
};

export default PatientsPage;
