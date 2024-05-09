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

interface GenderSelectProps {
  onGender?: (value: string) => void;
}
export const GenderSelect = ({ onGender }: GenderSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  const handleValueChange = (selected: string) => {
    setSelected(selected);
    if (onGender) {
      onGender(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el género.." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Masculino">Masculino</SelectItem>
        <SelectItem value="Femenino">Femenino</SelectItem>
      </SelectContent>
    </Select>
  );
};
