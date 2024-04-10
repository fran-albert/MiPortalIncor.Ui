"use client";
import withSessionTimeout from "@/components/withSessionTimeout";
import ProfileCardComponent from "@/sections/Profile/patient/ProfileCard";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import ProfileDoctorCardComponent from "@/sections/Profile/doctor/card";

const Profile = () => {
  const { data: session } = useSession();
  console.log(session)
  const id = session?.user.id;
  const token = session?.accessToken;
  const { isPatient, isDoctor, isSecretary } = useRoles();
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-20 flex justify-center items-center bg-slate-50 min-h-screen">
          {isPatient && <ProfileCardComponent id={id} />}
          {isDoctor && <ProfileDoctorCardComponent id={id} />}
        </div>
      </div>
    </>
  );
};
export default withSessionTimeout(Profile);
