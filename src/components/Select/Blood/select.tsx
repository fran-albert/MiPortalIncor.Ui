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

interface BloodSelectProps {
  onBlood?: (value: string) => void;
}
export const BloodSelect = ({ onBlood }: BloodSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  const handleValueChange = (selected: string) => {
    setSelected(selected);
    if (onBlood) {
      onBlood(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione el tipo de sangre..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="A+">A+</SelectItem>
        <SelectItem value="A-">A-</SelectItem>
        <SelectItem value="B+">B+</SelectItem>
        <SelectItem value="B-">B-</SelectItem>
        <SelectItem value="O+">O+</SelectItem>
        <SelectItem value="O-">O-</SelectItem>
      </SelectContent>
    </Select>
  );
};
