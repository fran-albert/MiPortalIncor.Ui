import ActionIcon from "@/components/ui/actionIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";

export const ViewButton = ({
  id,
  text,
  path,
}: {
  id: number;
  text: string;
  path: string;
}) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/usuarios/${path}/${id}`);
  };

  return (
    <div className="flex justify-center">
      <Button variant="ghost" onClick={handleEdit}>
        <ActionIcon
          icon={<FaRegEye size={20} className="mr-2" />}
          tooltip="Ver Paciente"
          color="text-gray-600"
        />
        {text}
      </Button>
    </div>
  );
};
