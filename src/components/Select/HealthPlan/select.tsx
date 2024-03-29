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
    selected?.id.toString()
  );
  useEffect(() => {
    if (idHealthInsurance) {
      const loadHealthPlans = async () => {
        try {
          const loadedHealthPlans =
            await healthPlansRepository.getByHealthInsurance(idHealthInsurance);
          console.log("Planes de salud cargados:", loadedHealthPlans);
          setHealthPlans(loadedHealthPlans || []);
          if (loadedHealthPlans && loadedHealthPlans.length > 0) {
            const firstPlanId = loadedHealthPlans[0].id.toString();
            setSelectedPlanId(firstPlanId);
            onPlanChange && onPlanChange(loadedHealthPlans[0]);
          }
        } catch (error) {
          console.error("Error al obtener las obras sociales:", error);
        }
      };
      loadHealthPlans();
    } else {
      setHealthPlans([]);
      setSelectedPlanId(undefined);
    }
  }, [idHealthInsurance]);

  useEffect(() => {
    console.log("Plan seleccionado actualizado:", selected);
    if (selected) {
      setSelectedPlanId(selected.id.toString());
    }
  }, [selected]);

  const handleValueChange = (idHI: string) => {
    const healthPlan = healthPlans.find((c) => c.id === Number(idHI));
    console.log("Plan de salud seleccionado por el usuario:", healthPlan);
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
