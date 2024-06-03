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
  const genderTypes = [
    { id: "Masculino", name: "Masculino" },
    { id: "Femenino", name: "Femenino" },
  ];

  return (
    <Controller
      name="gender"
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el género.." />
            </SelectTrigger>
            <SelectContent>
              {genderTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
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
