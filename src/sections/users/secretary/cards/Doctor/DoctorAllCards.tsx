import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
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
      <div className="rounded-lg w-96 sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <Link href={`/usuarios/medicos`}>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <FaUserDoctor className="w-6 h-6" color="#0e7490" />
              <CardTitle>Médicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center max-w-full">
                <div className="text-3xl font-bold">{totalDoctors}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"></div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
