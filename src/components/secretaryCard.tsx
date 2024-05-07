import { PatientCount } from "@/sections/users/secretary/cards/Patient/PatientAllCard";
import { DoctorsCount } from "@/sections/users/secretary/cards/Doctor/DoctorAllCards";
import { SpectialityCount } from "@/sections/users/secretary/cards/Spectiality/SpecialityAllCards";

export function SecretaryCard() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] lg:block">
      <div className="flex flex-col">
        <main className="flex-1 p-2 md:p-4">
          <div className="grid gap-6 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <PatientCount />
              <DoctorsCount />
              <SpectialityCount />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
