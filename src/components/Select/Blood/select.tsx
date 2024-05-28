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
import { Controller } from "react-hook-form";
interface BloodSelectProps {
  control: any;
  defaultValue?: string;
  errors: any;
}
export const BloodSelect = ({
  control,
  errors,
  defaultValue,
}: BloodSelectProps) => {
  return (
    <Controller
      name="bloodType"
      control={control}
      defaultValue={defaultValue}
      // rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select {...field} onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el tipo de sangre..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="O">O</SelectItem>
            </SelectContent>
          </Select>
          {errors.bloodType && (
            <p className="text-red-500 text-xs italic">
              {errors.bloodType.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
