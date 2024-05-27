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
import ActionIcon from "@/components/ui/actionIcon";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { createApiPatientRepository } from "@/modules/patients/infra/ApiPatientRepository";
import { deletePatient } from "@/modules/patients/application/delete/deletePatient";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { deleteStudy } from "@/modules/study/application/delete/delete";
import { AiOutlineDelete } from "react-icons/ai";
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

  const handleConfirmDelete = async () => {
    try {
      const studyRepository = createApiStudyRepository();
      await deleteStudy(studyRepository)(idStudy);
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
