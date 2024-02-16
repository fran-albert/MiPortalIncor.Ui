import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpecialitySelectProps {
  selected?: string;
  onSpecialityChange?: (value: string) => void;
}

export const SpecialitySelect = ({
  selected,
  onSpecialityChange,
}: SpecialitySelectProps) => {
  return (
    <Select value={selected} onValueChange={onSpecialityChange}>
      <SelectTrigger className="w-full bg-gray-200 text-gray-700">
        <SelectValue placeholder="Seleccione la especialidad..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OSDE">OSDE</SelectItem>
        <SelectItem value="Cardiologia">Cardiologia</SelectItem>
        <SelectItem value="Cardiología Infantil">
          Cardiología Infantil
        </SelectItem>
        <SelectItem value="OSDE">OSDE</SelectItem>
        <SelectItem value="OSDE">OSDE</SelectItem>
      </SelectContent>
    </Select>
  );
};
