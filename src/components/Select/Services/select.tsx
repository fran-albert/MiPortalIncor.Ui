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

interface ServiceSelectProps {
  selected?: string;
  onService?: (value: string) => void;
}
export const ServiceSelect = ({ selected, onService }: ServiceSelectProps) => {
  const handleValueChange = (selected: string) => {
    if (onService) {
      onService(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el servicio..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pacientes">Pacientes</SelectItem>
        <SelectItem value="Médicos">Médicos</SelectItem>
        <SelectItem value="Estudios">Estudios</SelectItem>
      </SelectContent>
    </Select>
  );
};
