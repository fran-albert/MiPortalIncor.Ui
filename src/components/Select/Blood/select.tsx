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
  const bloodTypes = [
    { id: "A", name: "A" },
    { id: "B", name: "B" },
    { id: "O", name: "O" },
  ];

  return (
    <Controller
      name="bloodType"
      control={control}
      // rules={{ required: "Este campo es obligatorio" }}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el tipo de sangre..." />
            </SelectTrigger>
            <SelectContent>
              {bloodTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
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
