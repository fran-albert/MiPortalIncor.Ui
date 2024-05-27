import Link from "next/link";
import { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { MdHealthAndSafety } from "react-icons/md";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
const healthInsuranceRepository = createApiHealthInsuranceRepository();

export const HealthInsuranceCount = () => {
  const [totalHealthInsurance, setTotalHealthInsurance] = useState<number>(0);

  useEffect(() => {
    const fetchTotalHc = async () => {
      const total = await healthInsuranceRepository.getTotalHealthInsurances();
      setTotalHealthInsurance(total);
    };

    fetchTotalHc().catch(console.error);
  }, []);

  return (
    <>
      <div className="rounded-lg sm:transition w-84 sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <Link href={`/obras-sociales`}>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <MdHealthAndSafety className="w-6 h-6" color="#e11d48" />
              <CardTitle>Obras Sociales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center max-w-full">
                <div className="text-3xl font-bold">{totalHealthInsurance}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"></div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
