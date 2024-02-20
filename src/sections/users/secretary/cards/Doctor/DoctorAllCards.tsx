import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";

export const DoctorsCount = () => {
  const [totalDoctors, setTotalDoctors] = useState<number>(0);

  useEffect(() => {
    const fetchTotalDoctors = async () => {
      const doctorRepository = createApiDoctorRepository();
      const total = await doctorRepository.getTotalDoctors();
      setTotalDoctors(total);
    };

    fetchTotalDoctors().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ width: "250px", height: "120px", overflow: "auto" }}
      >
        <div className="w-2 bg-indigo-500 rounded-l-xl"></div>
        <div className="flex-grow p-4">
          <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold">
            Total doctors
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {totalDoctors}
            </p>
            <div className="flex-shrink-0">
              <FaUserDoctor size={25} color="#1f2937" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
