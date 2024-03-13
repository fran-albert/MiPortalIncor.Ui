import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Speciality } from "@/modules/speciality/domain/Speciality";
import { SpecialityRepository } from "@/modules/speciality/domain/SpecialityRepository";
import { createApiSpecialityRepository } from "@/modules/speciality/infra/ApiSpecialityRepository";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { PiSelectionBackground } from "react-icons/pi";
interface SpecialitySelectProps {
  selected?: Speciality[];
  onSpecialityChange?: (value: Speciality[]) => void;
}

export const SpecialitySelect = ({
  selected = [],
  onSpecialityChange,
}: SpecialitySelectProps) => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const specialityRepository: SpecialityRepository =
    createApiSpecialityRepository();
  const [selectedSpecialities, setSelectedSpecialities] = useState<
    Speciality[]
  >([]);

  useEffect(() => {
    const loadSpecialities = async () => {
      try {
        const loadedSpecialities =
          await specialityRepository.getAllSpecialities();
        setSpecialities(loadedSpecialities || []);
      } catch (error) {
        console.error("Error al obtener las localidades:", error);
      }
    };

    loadSpecialities();
    setSpecialities([]);
  }, []);

  const handleValueChange = (selectedItems: Speciality[]) => {
    // Actualiza el estado local con las nuevas especialidades seleccionadas
    setSelectedSpecialities(selectedItems);

    // Si hay una función prop para manejar el cambio, llámala
    if (onSpecialityChange) {
      onSpecialityChange(selectedItems);
    }
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleValueChange} multiple>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full h-10 text-start text-popover-foreground cursor-default bg-gray-200 rounded-md border border-input bg-background px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <span className="block truncate">
                  {selected.length > 0
                    ? selected.map((s) => s.name).join(", ")
                    : "Seleccione las especialidades..."}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 py-1 w-full  max-h-96 overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {specialities.map((speciality) => (
                    <Listbox.Option
                      key={speciality.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1.5 pl-8 pr-2 text-sm ${
                          active
                            ? "bg-accent text-popover-foreground"
                            : "text-popover-foreground"
                        }`
                      }
                      value={speciality}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {speciality.name}
                          </span>
                          {selected ? (
                            <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-accent-foreground"
                                : "text-popover-foreground"
                            }`}
                          >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
