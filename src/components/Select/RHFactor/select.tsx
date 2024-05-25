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

interface RHFactorSelectProps {
  control: any;
  errors: any;
}
export const RHFactorSelect = ({
  control, errors
}: RHFactorSelectProps) => {
  return (
    <Controller
      name="RHFactor"
      control={control}
      // rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select {...field} onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el factor RH.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Positivo">RH Positivo</SelectItem>
              <SelectItem value="Negativo">RH Negativo</SelectItem>
            </SelectContent>
          </Select>
          {errors.RHFactor && (
            <p className="text-red-500 text-xs italic">
              {errors.RHFactor.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
