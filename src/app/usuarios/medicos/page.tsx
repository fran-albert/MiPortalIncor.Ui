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
  const { isPatient, isAdmin, isDoctor } = useRoles();
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
      <DoctorsTable />
    </div>
  );
};

export default DoctorsPage;
