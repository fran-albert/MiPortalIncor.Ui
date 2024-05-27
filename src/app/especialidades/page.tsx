"use client";
import Loading from "@/components/Loading/loading";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";
import { SpecialityTable } from "@/sections/users/secretary/Especiality/table/table";

function SpecialityPage() {
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <div>
      <SpecialityTable />
    </div>
  );
}

export default SpecialityPage;
