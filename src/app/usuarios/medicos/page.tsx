"use client";
import React, { useEffect, useState } from "react";
import { DoctorsTable } from "@/sections/users/doctors/table/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";

const DoctorsPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  useEffect(() => {
    if (status === "loading") return;
    if (!session || isPatient || isDoctor) {
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
    //   <div className="flex-grow mt-24 p-10 ">
    //     <DoctorsTable />
    //   </div>
    // </div>
    <div>
      <DoctorsTable />
    </div>
  );
};

export default DoctorsPage;
