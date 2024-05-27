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
import { useForm, Controller } from "react-hook-form";

interface GenderSelectProps {
  onGender?: (value: string) => void;
  control: any;
  errors: any;
}
export const GenderSelect = ({ onGender, control, errors }: GenderSelectProps) => {
  const [selected, setSelected] = useState<string>("");
  const handleValueChange = (selected: string) => {
    setSelected(selected);
    if (onGender) {
      onGender(selected);
    }
  };

  return (
    <Controller
      name="gender"
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select {...field} onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el género.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Masculino">Masculino</SelectItem>
              <SelectItem value="Femenino">Femenino</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">
              {errors.gender.message}
            </p>
          )}
        </div>
      )}
    />
  )
};
