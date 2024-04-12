import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export const PatientCount = () => {
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchTotalPatients = async () => {
      const patientRepository = createApiPatientRepository();
      const total = await patientRepository.getTotalPatients();
      setTotalPatients(total);
    };

    fetchTotalPatients().catch(console.error);
  }, []);
  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ width: "250px", height: "120px", overflow: "auto" }}
      >
        <div className="w-2 bg-teal-500 rounded-l-xl"></div>
        <Link href={`/usuarios/pacientes`}>
          <div className="flex-grow p-4">
            <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold">
              Pacientes
            </div>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {totalPatients}
              </p>
              <div className="flex-shrink-0">
                <FaUser size={25} color="#1f2937" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
