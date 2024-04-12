import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHospitalCross } from "react-icons/gi";

const doctorRepository = createApiSpecialityRepository();

export const SpectialityCount = () => {
  const [totalSpectiality, setTotalSpeciality] = useState<number>(0);

  useEffect(() => {
    const fetchTotalDoctors = async () => {
      const total = await doctorRepository.getTotalSpecialities();
      setTotalSpeciality(total);
    };

    fetchTotalDoctors().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ width: "250px", height: "120px", overflow: "auto" }}
      >
        <div className="w-2 bg-amber-500 rounded-l-xl"></div>
        <Link href={`/especialidades`}>
          <div className="flex-grow p-4">
            <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold">
              Especialidades
            </div>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {totalSpectiality}
              </p>
              <div className="flex-shrink-0">
                <GiHospitalCross size={25} color="#1f2937" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
