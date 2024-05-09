import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { SpectialityCount } from "@/sections/users/secretary/cards/Spectiality/SpecialityAllCards";
import { HealthInsuranceCount } from "@/sections/users/secretary/cards/HealthInsurance/HealthInsuranceAllCard";
import useRoles from "@/hooks/useRoles";

export function CountsCards() {
  const { isSecretary, isDoctor } = useRoles();
  return (
    // <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] lg:block">
    //   <div className="flex flex-col">
    //     <main className="flex-1 p-2 md:p-4">
    //       <div className="grid gap-6 md:gap-8">
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    //           {isSecretary && (
    //             <>
    //               <PatientCount />
    //               <DoctorsCount />
    //               <SpectialityCount />
    //               <HealthInsuranceCount />
    //             </>
    //           )}
    //           {isDoctor && (
    //             <>
    //               <PatientCount />
    //               <SpectialityCount />
    //               <HealthInsuranceCount />
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <>
      {isSecretary && (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <PatientCount />
            <DoctorsCount />
            <SpectialityCount />
            <HealthInsuranceCount />
          </div>
        </main>
      )}
      {isDoctor && (
        <>
          <PatientCount />
          <SpectialityCount />
          <HealthInsuranceCount />
        </>
      )}
    </>
  );
}
