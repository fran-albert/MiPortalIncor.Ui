import ActionIcon from "@/components/ui/actionIcon";
import { Button } from "@/components/ui/button";
import { Patient } from "@/modules/patients/domain/Patient";
import { useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";

interface EditButtonProps {
  id: number;
  path: string;
}

export const EditButton = ({ id, path }: EditButtonProps) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/${path}/${id}/editar`);
  };

  return (
    <div className="">
      <button onClick={handleEdit}>
        {/* <ActionIcon
          icon={<FaPencilAlt size={20} />}
          tooltip="Editar"
          color="text-gray-600"
        /> */}
        Editar Datos
      </button>
    </div>
  );
};
