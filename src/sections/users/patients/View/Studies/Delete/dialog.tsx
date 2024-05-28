"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import useStudyStore from "@/hooks/useStudy";
import { Study } from "@/modules/study/domain/Study";

interface DeleteStudyDialogProps {
  idStudy: number;
  studies: Study[];
  onStudyDeleted?: (idStudy: number) => void;
}

export default function DeleteStudyDialog({
  idStudy,
  studies,
  onStudyDeleted,
}: DeleteStudyDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const deleteStudy = useStudyStore((state) => state.deleteStudy);

  const handleConfirmDelete = async () => {
    try {
      await deleteStudy(idStudy);
      toast.success("Estudio eliminado con éxito!");
      if (onStudyDeleted) {
        onStudyDeleted(idStudy);
      }
    } catch (error) {
      console.error("Error al eliminar el estudio", error);
      toast.error("Error al eliminar el estudio");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AiOutlineDelete
          className="text-red-600 cursor-pointer"
          size={30}
          onClick={toggleDialog}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Eliminar{" "}
            {studies.map((study) => study.id === idStudy && study.note)}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar el estudio?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialog}>
            Cancelar
          </Button>
          <Button variant="teal" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
