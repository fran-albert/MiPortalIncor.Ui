"use client";
import InfoBanner from "@/components/Banner/banner";
import { CountsCards } from "@/components/Cards/Counts/card";
import withSessionTimeout from "@/components/withSessionTimeout";
import useRoles from "@/hooks/useRoles";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";

function HomePage() {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const isAdmin = isPatient && isSecretary && isDoctor;

  return (
    <div>
      {isAdmin ? (
        <div>
          <h2 className="text-2xl font-semibold text-center">
            Panel de Control - Administrador
          </h2>
          <CountsCards />
        </div>
      ) : (
        <>
          {isSecretary && (
            <div>
              <h2 className="text-2xl font-semibold text-center">
                Panel de Control - Secretaria
              </h2>
              <InfoBanner />
              <CountsCards />
            </div>
          )}

          {isDoctor && (
            <div>
              <h2 className="text-2xl font-semibold text-center">
                Panel de Control - Médico
              </h2>
              <CountsCards />
            </div>
          )}

          {isPatient && (
            <div className="mt-14">
              <WelcomeCardComponent />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default withSessionTimeout(HomePage);
