import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HealthInsuranceSelectProps {
  selected?: string;
  onHIChange?: (value: string) => void;
}

export const HealthInsuranceSelect = ({
  selected,
  onHIChange,
}: HealthInsuranceSelectProps) => {
  return (
    <Select value={selected} onValueChange={onHIChange}>
      <SelectTrigger className="w-full bg-gray-200 text-gray-700">
        <SelectValue placeholder="Seleccione la obra social..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OSDE">OSDE</SelectItem>
      </SelectContent>
    </Select>
  );
};
