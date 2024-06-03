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
  defaultValue?: string;
}
export const RHFactorSelect = ({
  control,
  errors,
  defaultValue,
}: RHFactorSelectProps) => {
  const rhTypes = [
    { id: "Positivo", name: "Positivo" },
    { id: "Negativo", name: "Negativo" },
  ];

  return (
    <Controller
      name="rhFactor"
      control={control}
      defaultValue={defaultValue || ""}
      // rules={{ required: "Este campo es obligatorio" }}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el factor RH.." />
            </SelectTrigger>
            <SelectContent>
              {rhTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
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
