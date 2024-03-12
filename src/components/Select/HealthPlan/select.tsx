import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { HealthPlans } from "@/modules/healthPlans/domain/HealthPlan";
import { createApiHealthPlansRepository } from "@/modules/healthPlans/infra/ApiHealthPlansRepository";
import { useEffect, useState } from "react";

interface HealthPlanSelectProps {
  selected?: HealthPlans;
  onPlanChange?: (value: HealthPlans) => void;
  idHealthInsurance: number;
}

export const HealthPlanSelect = ({
  selected,
  onPlanChange,
  idHealthInsurance,
}: HealthPlanSelectProps) => {
  const [healthPlans, setHealthPlans] = useState<HealthPlans[]>([]);
  const healthPlansRepository = createApiHealthPlansRepository();
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (idHealthInsurance) {
      const loadHealthPlans = async () => {
        try {
          const loadedHealthPlans =
            await healthPlansRepository.getByHealthInsurance(idHealthInsurance);
          setHealthPlans(loadedHealthPlans || []);
        } catch (error) {
          console.error("Error al obtener las obras sociales:", error);
        }
      };
      loadHealthPlans();
    } else {
      setHealthPlans([]);
    }
  }, [idHealthInsurance]);

  const handleValueChange = (idHI: string) => {
    const healthPlan = healthPlans.find((c) => c.id === Number(idHI));
    if (healthPlan) {
      onPlanChange && onPlanChange(healthPlan);
      setSelectedPlanId(idHI);
    }
  };

  return (
    <Select value={selectedPlanId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full bg-gray-200 text-gray-700">
        <SelectValue placeholder="Seleccione el plan..." />
      </SelectTrigger>
      <SelectContent>
        {healthPlans?.map((healthPlan) => (
          <SelectItem key={healthPlan.id} value={String(healthPlan.id)}>
            {healthPlan.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
