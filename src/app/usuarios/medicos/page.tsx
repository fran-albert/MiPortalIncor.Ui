"use client";
import { DoctorsTable } from "@/sections/users/doctors/table/table";
import Loading from "@/components/Loading/loading";
import { useAuthDoctorLoading } from "@/hooks/useDoctorAuth";

const DoctorsPage = () => {
  const { isLoading } = useAuthDoctorLoading();

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <div>
      <DoctorsTable />
    </div>
  );
};

export default DoctorsPage;
