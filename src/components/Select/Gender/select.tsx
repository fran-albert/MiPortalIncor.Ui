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
  control: any;
  errors: any;
  defaultValue?: string;
}
export const GenderSelect = ({
  control,
  errors,
  defaultValue,
}: GenderSelectProps) => {
  return (
    <Controller
      name="gender"
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      defaultValue={defaultValue}
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
  );
};
