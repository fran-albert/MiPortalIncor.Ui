"use client";
import { CountsCards } from "@/components/Cards/Counts/card";
import withSessionTimeout from "@/components/withSessionTimeout";
import useRoles from "@/hooks/useRoles";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";
function HomePage() {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <div>
      {isSecretary && (
        <div>
          <h2 className="text-2xl font-semibold text-center">
            Panel de Control - Secretaria
          </h2>
          <CountsCards />
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
  );
}

export default withSessionTimeout(HomePage);
