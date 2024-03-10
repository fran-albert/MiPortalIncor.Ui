"use client";

import { useEffect, useState } from "react";
// import { IUser } from "@/common/interfaces/user.interface";
// import { useCustomSession } from "@/context/SessionAuthProviders";
// import useFetchStates from "@/hooks/useFetchState";
// import useFetchProfile from "@/hooks/useFetchProfile";
import axios from "axios";
import withSessionTimeout from "@/components/withSessionTimeout";
import SideBar from "@/components/sideBar";
import ProfileCardComponent from "@/sections/Profile/ProfileCard";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/loading";

const Profile = () => {
  //   const [user, setUser] = useState<IUser | undefined>(undefined);
  //   const { session } = useCustomSession();
  //   const { states: provincias, isLoading: isLoadingStates } = useFetchStates(
  //     session?.user?.token
  //   );
  //   const { profile, isLoading: isProfileLoading } = useFetchProfile(
  //     session?.user?.token
  //   );

  //   useEffect(() => {
  //     if (profile) {
  //       setUser(profile);
  //     }
  //   }, [profile]);

  //   const updateUser = (updatedUser: IUser) => {
  //     setUser(updatedUser);
  //   };

  const { data: session } = useSession();
  const id = session?.user.id;
  const token = session?.accessToken;
  console.log(id, token);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-40 flex justify-center items-center">
          <ProfileCardComponent
            id={id}
            // user={user}
            // states={provincias}
            // updateUser={updateUser}
          />
        </div>
      </div>
    </>
  );
};
export default withSessionTimeout(Profile);
