import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHospitalCross } from "react-icons/gi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
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
      <div className="rounded-lg sm:transition w-84 sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <Link href={`/especialidades`}>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <GiHospitalCross className="w-6 h-6" color="#b45309" />
              <CardTitle>Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center max-w-full">
                <div className="text-3xl font-bold">{totalSpectiality}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"></div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
