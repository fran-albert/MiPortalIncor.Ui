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

interface PrioritySelectProps {
  selected?: string;
  onPriority?: (value: string) => void;
}
export const PrioritySelect = ({
  selected = "Media",
  onPriority,
}: PrioritySelectProps) => {
  const handleValueChange = (selected: string) => {
    if (onPriority) {
      onPriority(selected);
    }
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione la prioridad..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Baja">Baja</SelectItem>
        <SelectItem value="Media">Media</SelectItem>
      </SelectContent>
    </Select>
  );
};
