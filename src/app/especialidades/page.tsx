"use client";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import { SpecialityTable } from "@/sections/users/secretary/Especiality/table/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SpecialityPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  useEffect(() => {
    if (status === "loading") return;
    if (!session || isPatient || isDoctor) {
      router.replace("/inicio");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);
  if (isLoading || status === "loading") {
    return <Loading isLoading={true} />;
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-24 p-10 bg-slate-50">
        <SpecialityTable />
      </div>
    </div>
  );
}

export default SpecialityPage;
