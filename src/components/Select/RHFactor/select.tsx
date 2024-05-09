import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface RHFactorSelectProps {
  onRHFactor?: (value: string) => void;
}
export const RHFactorSelect = ({
  onRHFactor,
}: RHFactorSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  const handleValueChange = (selected: string) => {
    setSelected(selected);
    if (onRHFactor) {
      onRHFactor(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el factor RH..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Positivo">Positivo +</SelectItem>
        <SelectItem value="Negativo">Negativo -</SelectItem>
      </SelectContent>
    </Select>
  );
};
