"use client";
import { Role } from "@/common/enums/role.enum";
import { SecretaryCard } from "@/components/secretaryCard";
import withSessionTimeout from "@/components/withSessionTimeout";
import { useCustomSession } from "@/context/SessionAuthProviders";
import useRoles from "@/hooks/useRoles";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { SpectialityCount } from "@/sections/users/secretary/cards/Spectiality/SpecialityAllCards";

function HomePage() {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="flex justify-center items-center ">
        {isSecretary && (
          <div className="w-full px-4 mt-28">
            <h2 className="text-2xl font-semibold text-center">
              Secretaria Dashboard
            </h2>
            <div className="flex flex-wrap justify-center gap-20 md:ml-32 lg:ml-12">
              <SecretaryCard />
            </div>
          </div>
        )}
        {isDoctor && (
          <div className="w-full px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Médico Dashboard
            </h2>
            <div className="flex justify-center items-center">
              <PatientCount />
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
