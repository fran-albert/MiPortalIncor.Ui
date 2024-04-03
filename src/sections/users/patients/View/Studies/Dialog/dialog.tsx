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
import { FaCamera, FaFilePdf, FaUpload } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import { Patient } from "@/modules/patients/domain/Patient";
import moment from "moment-timezone";
interface AddLabDialogProps {
  patient: Patient | null;
}

export default function StudyDialog({ patient }: AddLabDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const toggleDialog = () => setIsOpen(!isOpen);

  const handleConfirmDelete = async () => {
    // try {
    //   await axios.delete(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${idPatient}`
    //   );
    //   toast.success("Laboratorio agregado correctamente");
    // } catch (error) {
    //   console.error("Error al agregar el laborartorio", error);
    //   toast.error("Error al agregar el laborartorio");
    // } finally {
    //   setIsOpen(false);
    // }
  };
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    // setValue("birthDate", formattedDateISO);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={toggleDialog}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50"
        >
          <FaUpload className="w-4 h-4 mr-2 text-teal-600" />
          <span className="text-teal-600">Adjuntar Archivo</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Estudio - {patient?.firstName} </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="w-full max-w-md mx-auto">
            <div className="mb-4">
              <Label
                htmlFor="name"
                className="text-black font-medium mb-2 block"
              >
                Tipo de Estudio
              </Label>
              <Input
                name="name"
                id="name"
                className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label
                htmlFor="name"
                className="text-black font-medium mb-2 block"
              >
                Comentario *
              </Label>
              <Input className="w-full bg-gray-200 border-gray-300 text-gray-800" />
            </div>

            <div>
              <Label
                htmlFor="healthCare"
                className="text-black font-medium mb-2 block"
              >
                Fecha *
              </Label>
              <DatePicker
                showIcon
                selected={startDate}
                className="max-w-full"
                onChange={handleDateChange}
                locale="es"
                customInput={
                  <Input className="w-full bg-gray-200 border-gray-300 text-gray-800" />
                }
                dateFormat="d MMMM yyyy"
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
