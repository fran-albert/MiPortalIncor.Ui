"use client";
import { CountsCards } from "@/components/Cards/Counts/card";
import withSessionTimeout from "@/components/withSessionTimeout";
import { useCustomSession } from "@/context/SessionAuthProviders";
import useRoles from "@/hooks/useRoles";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";

function HomePage() {
  const { session } = useCustomSession();
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center ">
        <div className="md:w-64 w-full"></div>
        {isSecretary && (
          <div className="w-full px-4 mt-28">
            <h2 className="text-2xl font-semibold text-center">
              Panel de Control - Secretaria
            </h2>
            <div className="flex flex-wrap justify-center gap-20 md:ml-32 lg:ml-12">
              <CountsCards />
            </div>
          </div>
        )}
        {isDoctor && (
          <div className="w-full px-4">
            <h2 className="text-2xl font-semibold text-center mb-6 mt-28">
              Panel de Control - Médico
            </h2>
            <div className="flex justify-center items-center">
              <CountsCards />
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
