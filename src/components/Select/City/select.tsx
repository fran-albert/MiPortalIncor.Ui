// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Address } from "@/modules/address/domain/Address";
// import { City } from "@/modules/city/domain/City";
// import { CityRepository } from "@/modules/city/domain/CityRepository";
// import { createApiCityRepository } from "@/modules/city/infra/ApiCityRepository";
// import { useEffect, useState, Fragment } from "react";
// import { Listbox, Transition } from "@headlessui/react";

// interface CitySelectProps {
//   selected?: City;
//   onCityChange?: (value: City) => void;
//   idState?: number;
// }

// export const CitySelect = ({
//   selected,
//   onCityChange,
//   idState,
// }: CitySelectProps) => {
//   const [cities, setCities] = useState<City[]>([]);
//   const cityRepository: CityRepository = createApiCityRepository();
//   const [selectedCityId, setSelectedCityId] = useState<string | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     if (idState) {
//       const loadCities = async () => {
//         try {
//           const loadedCities = await cityRepository.getAllByState(idState);
//           setCities(loadedCities || []);
//         } catch (error) {
//           console.error("Error al obtener las localidades:", error);
//         }
//       };

//       loadCities();
//     } else {
//       setCities([]);
//     }
//   }, [idState]);

//   const handleValueChange = (cityId: string) => {
//     const city = cities.find((c) => String(c.id) === cityId);
//     if (city) {
//       onCityChange && onCityChange(city);
//       setSelectedCityId(cityId);
//     }
//   };

//   return (
//     <Select onValueChange={handleValueChange} value={selected?.id.toString()}>
//       <SelectTrigger>
//         <SelectValue placeholder="Seleccione la localidad..." />
//       </SelectTrigger>
//       <SelectContent>
//         {cities?.map((city) => (
//           <SelectItem key={String(city.id)} value={String(city.id)}>
//             {city.name}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [cities, setCities] = useState<City[]>([]);
  const cityRepository: CityRepository = createApiCityRepository();

  useEffect(() => {
    if (idState) {
      const loadCities = async () => {
        try {
          const loadedCities = await cityRepository.getAllByState(idState);
          setCities(loadedCities || []);
        } catch (error) {
          console.error("Error al obtener las localidades:", error);
        }
      };

      loadCities();
    } else {
      setCities([]);
    }
  }, [idState]);

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
            <p className="text-red-500 text-xs italic">
              {errors.city.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

