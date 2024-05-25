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
  control: any;
  errors: any;
}
export const MaritalStatusSelect = ({
  control, errors
}: MaritalStatusSelectProps) => {
  return (
    <Controller
      name="maritalStatus"
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
