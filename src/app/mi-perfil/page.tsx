"use client";
import withSessionTimeout from "@/components/withSessionTimeout";
import ProfileCardComponent from "@/sections/Profile/patient/ProfileCard";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/loading";
import useRoles from "@/hooks/useRoles";
import ProfileDoctorCardComponent from "@/sections/Profile/doctor/card";
import ProfileSecretaryCardComponent from "@/sections/Profile/secretary/card";

const Profile = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const token = session?.accessToken;
  const { isPatient, isDoctor, isSecretary } = useRoles();
  return (
    <>
      {isPatient && <ProfileCardComponent id={id} />}
      {isDoctor && <ProfileDoctorCardComponent id={id} />}
      {isSecretary && <ProfileSecretaryCardComponent id={id} />}
    </>
  );
};
export default withSessionTimeout(Profile);
