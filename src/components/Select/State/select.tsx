import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "@/modules/state/domain/State";
import { createApiStateRepository } from "@/modules/state/infra/ApiStateRepository";

interface StateSelectProps {
  selected?: State;
  onStateChange?: (value: State) => void;
}

export const StateSelect = ({ selected, onStateChange }: StateSelectProps) => {
  const [states, setStates] = useState<State[]>([]);
  const stateRepository = createApiStateRepository();

  useEffect(() => {
    const loadStates = async () => {
      try {
        const states = await stateRepository.getAll();
        setStates(states);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    loadStates();
  }, []);

  const handleValueChange = (selectedId: string) => {
    const selectedState = states.find(
      (state) => String(state.id) === selectedId
    );
    if (onStateChange && selectedState) {
      onStateChange(selectedState);
    }
  };

  return (
    <Select value={selected?.id.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full bg-gray-200 text-gray-700">
        <SelectValue placeholder="Seleccione la provincia..." />
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => (
          <SelectItem key={String(state.id)} value={String(state.id)}>
            {state.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
