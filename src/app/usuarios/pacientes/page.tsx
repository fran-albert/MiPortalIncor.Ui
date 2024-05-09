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
  const { isPatient } = useRoles();
  useEffect(() => {
    if (status === "loading") return;
    if (!session || isPatient) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }
  return (
    // <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
    //   <div className="md:w-64 w-full"></div>
    //   <div className="flex-grow mt-28">
    //     <PatientTable />
    //   </div>
    // </div>
    // <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
    //   <div className="flex-grow">
    //   </div>
    // </div>
    <div>
      <PatientTable />
    </div>
  );
};

export default PatientsPage;
