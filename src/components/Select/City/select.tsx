import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCityStore } from "@/hooks/useCity";
import { City } from "@/modules/city/domain/City";
import { CityRepository } from "@/modules/city/domain/CityRepository";
import { createApiCityRepository } from "@/modules/city/infra/ApiCityRepository";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface CitySelectProps {
  control: any;
  errors: any;
  idState?: number;
  defaultValue?: City;
  onCityChange?: (value: City) => void;
}

export const CitySelect = ({
  control,
  errors,
  idState,
  defaultValue,
  onCityChange,
}: CitySelectProps) => {
  const { cities, fetchCities, getCitiesByState, isLoading } = useCityStore();

  useEffect(() => {
    if (idState) {
      getCitiesByState(idState);
    } else {
      fetchCities();
    }
  }, [idState, getCitiesByState, fetchCities]);

  const handleValueChange = (cityId: string) => {
    const city = cities.find((c) => String(c.id) === cityId);
    if (city) {
      onCityChange && onCityChange(city);
    }
  };

  return (
    <Controller
      name="city"
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
              <SelectValue placeholder="Seleccione la localidad..." />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={String(city.id)} value={String(city.id)}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-red-500 text-xs italic">{errors.city.message}</p>
          )}
        </div>
      )}
    />
  );
};
