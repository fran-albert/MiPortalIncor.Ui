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

interface MaritalStatusSelectProps {
  onMaritalStatus?: (value: string) => void;
}
export const MaritalStatusSelect = ({
  onMaritalStatus,
}: MaritalStatusSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  const handleValueChange = (selected: string) => {
    setSelected(selected);
    if (onMaritalStatus) {
      onMaritalStatus(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el estado civil..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Soltero">Soltero</SelectItem>
        <SelectItem value="Casado">Casado</SelectItem>
        <SelectItem value="Divorciado">Divorciado</SelectItem>
      </SelectContent>
    </Select>
  );
};
