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
  onHealthInsuranceChange: (value: HealthInsurance) => void;
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
        // Selecciona automáticamente la primera obra social si ninguna está seleccionada
        if (!selected && loadedHealthInsurance.length > 0) {
          onHealthInsuranceChange(loadedHealthInsurance[0]);
        }
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
    <Select
      value={selected?.id.toString()}
      onValueChange={(selectedId) => {
        const selectedHealthInsurance = healthInsurance.find(
          (hi) => String(hi.id) === selectedId
        );
        if (onHealthInsuranceChange && selectedHealthInsurance) {
          onHealthInsuranceChange(selectedHealthInsurance);
        }
      }}
    >
      <SelectTrigger className="w-full">
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
