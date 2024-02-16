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
import { FaCamera, FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/datePicker";
interface AddLabDialogProps {
  idPatient: number;
}

export default function AddLabDialog({ idPatient }: AddLabDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${idPatient}`
      );
      toast.success("Laboratorio agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el laborartorio", error);
      toast.error("Error al agregar el laborartorio");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={toggleDialog}>
          <ActionIcon
            icon={<FaFilePdf size={20} />}
            tooltip="Agregar Laboratorio"
            color="text-teal-600"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Laboratorio</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="w-full max-w-md mx-auto">
            <div className="mb-4">
              <Label
                htmlFor="name"
                className="text-black font-medium mb-2 block"
              >
                Análisis
              </Label>
              <Input
                name="name"
                id="name"
                className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="date"
                className="text-black font-medium mb-2 block"
              >
                Fecha
              </Label>
              <DatePicker />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="picture"
                className="text-black font-medium mb-2 block"
              >
                Archivo PDF
              </Label>
              <Input
                id="picture"
                type="file"
                className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
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
