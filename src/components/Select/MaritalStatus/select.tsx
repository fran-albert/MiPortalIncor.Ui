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

interface MaritalStatusSelectProps {
  defaultValue?: string;
  control: any;
  errors: any;
}
export const MaritalStatusSelect = ({
  control, errors, defaultValue
}: MaritalStatusSelectProps) => {
  return (
    <Controller
      name="maritalStatus"
      defaultValue={defaultValue}
      control={control}
      // rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select {...field} onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el estado civil.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Soltero">Soltero</SelectItem>
              <SelectItem value="Casado">Casado</SelectItem>
              <SelectItem value="Divorciado">Divorciado</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-xs italic">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
      )}
    />

  );
};
