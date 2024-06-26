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
import { createApiDoctorRepository } from "@/modules/doctors/infra/ApiDoctorRepository";
import { deleteDoctor } from "@/modules/doctors/application/delete/deleteDoctor";

interface DeleteDoctorDialogProps {
  idDoctor: number;
  onDoctorDeleted?: () => void;
}

export default function DeleteDoctorDialog({
  idDoctor,
  onDoctorDeleted,
}: DeleteDoctorDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    try {
      const doctorRepository = createApiDoctorRepository();
      const deleteDoctorFn = deleteDoctor(doctorRepository);
      const doctorDeletionPromise = deleteDoctorFn(idDoctor);
      toast.promise(doctorDeletionPromise, {
        loading: "Eliminando médico...",
        success: "Médico eliminado con éxito!",
        error: "Error al eliminar el médico",
        duration: 3000,
      });
      if (onDoctorDeleted) {
        onDoctorDeleted();
      }
    } catch (error) {
      console.error("Error al eliminar el médico", error);
      toast.error("Error al eliminar el médico");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-700 hover:bg-red-500 ml-2"
          onClick={toggleDialog}
        >
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Médico</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar el médico?
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
