import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HealthInsurance } from "@/modules/healthInsurance/domain/HealthInsurance";
import { createApiHealthInsuranceRepository } from "@/modules/healthInsurance/infra/ApiHealthInsuranceRepository";
import { useEffect, useState } from "react";

interface HealthInsuranceSelectProps {
  selected?: HealthInsurance;
  onHealthInsuranceChange?: (value: HealthInsurance) => void;
}

export const HealthInsuranceSelect = ({
  selected,
  onHealthInsuranceChange,
}: HealthInsuranceSelectProps) => {
  const [healthInsurance, setHealthInsurance] = useState<HealthInsurance[]>([]);
  const healthInsuranceRepository = createApiHealthInsuranceRepository();

  useEffect(() => {
    const loadHealthInsurance = async () => {
      try {
        const loadedHealthInsurance = await healthInsuranceRepository.getAll();
        setHealthInsurance(loadedHealthInsurance || []);
      } catch (error) {
        console.error("Error al obtener las obras sociales:", error);
      }
    };

    loadHealthInsurance();
  }, []);

  const handleValueChange = (selectedId: string) => {
    const selectedHealthInsurance = healthInsurance.find(
      (healthInsurance) => String(healthInsurance.id) === selectedId
    );
    if (onHealthInsuranceChange && selectedHealthInsurance) {
      onHealthInsuranceChange(selectedHealthInsurance);
    }
  };

  return (
    <Select value={selected?.id.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full bg-gray-200 text-gray-700">
        <SelectValue placeholder="Seleccionar la obra..." />
      </SelectTrigger>
      <SelectContent>
        {healthInsurance.map((hi) => (
          <SelectItem key={String(hi.id)} value={String(hi.id)}>
            {hi.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
