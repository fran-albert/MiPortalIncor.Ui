"use client";
import { Role } from "@/common/enums/role.enum";
import withSessionTimeout from "@/components/withSessionTimeout";
import { useCustomSession } from "@/context/SessionAuthProviders";
import useRoles from "@/hooks/useRoles";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { UserCount } from "@/sections/users/secretary/cards/User/UserAllCard";

function HomePage() {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <div className="flex justify-center items-center">
      <div className="md:w-64 w-full"></div>
      <div className="flex justify-center items-start mt-32">
        {isSecretary && (
          <div className="w-full px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Admin Dashboard
            </h2>
            <div className="flex flex-wrap justify-center gap-20 md:ml-32 lg:ml-12"> 
              <PatientCount />
              <DoctorsCount />
              <UserCount />
              <UserCount />
            </div>
          </div>
        )}
        {isPatient && (
          <div className="mt-14">
            <WelcomeCardComponent />
          </div>
        )}
      </div>
    </div>
  );
}

export default withSessionTimeout(HomePage);
