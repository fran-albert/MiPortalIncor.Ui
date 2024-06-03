import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "@/modules/state/domain/State";
import { Controller } from "react-hook-form";
import { useStateStore } from "@/hooks/useState";

interface StateSelectProps {
  control: any;
  errors: any;
  defaultValue?: State;
  onStateChange?: (value: State) => void;
}

export const StateSelect = ({
  control,
  errors,
  defaultValue,
  onStateChange,
}: StateSelectProps) => {
  const { states, fetchStates, isLoading } = useStateStore();

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);
  const handleValueChange = (selectedId: string) => {
    const selectedState = states.find(
      (state) => String(state.id) === selectedId
    );
    if (onStateChange && selectedState) {
      onStateChange(selectedState);
    }
  };

  return (
    <Controller
      name="state"
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      defaultValue={defaultValue ? defaultValue.id.toString() : ""}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              handleValueChange(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione la provincia..." />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={String(state.id)} value={String(state.id)}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-red-500 text-xs italic">
              {errors.state.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
