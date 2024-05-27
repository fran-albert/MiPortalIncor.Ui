import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { SpectialityCount } from "@/sections/users/secretary/cards/Spectiality/SpecialityAllCards";
import { HealthInsuranceCount } from "@/sections/users/secretary/cards/HealthInsurance/HealthInsuranceAllCard";
import useRoles from "@/hooks/useRoles";

export function CountsCards() {
  const { isSecretary, isDoctor, isAdmin } = useRoles();

  return (
    <>
      {isAdmin && (
        <main className="grid gap-4 p-4 md:gap-8 md:p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PatientCount />
          <DoctorsCount />
          <SpectialityCount />
          <HealthInsuranceCount />
        </main>
      )}

      {isSecretary && !isAdmin && (
        <main className="grid gap-4 p-4 md:gap-8 md:p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PatientCount />
          <DoctorsCount />
          <SpectialityCount />
          <HealthInsuranceCount />
        </main>
      )}

      {isDoctor && !isAdmin && (
        <div className="grid gap-4 p-4 md:gap-8 md:p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PatientCount />
          <SpectialityCount />
          <HealthInsuranceCount />
        </div>
      )}
    </>
  );
}
