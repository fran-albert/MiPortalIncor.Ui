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
  const { isPatient, isDoctor, isSecretary } = useRoles();

  if (!id) {
    return <Loading isLoading={true} />;
  }

  if (isDoctor) {
    return <ProfileDoctorCardComponent id={id} />;
  }

  if (isSecretary) {
    return <ProfileSecretaryCardComponent id={id} />;
  }

  if (isPatient) {
    return <ProfileCardComponent id={id} />;
  }

  return null;
};

export default withSessionTimeout(Profile);
