import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
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
      <div className="rounded-lg w-84 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <Link href={`/usuarios/pacientes`}>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <FaUser className="w-6 h-6" color="#0f766e" />
              <CardTitle>Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center max-w-full">
                <div className="text-3xl font-bold">{totalPatients}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"></div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
