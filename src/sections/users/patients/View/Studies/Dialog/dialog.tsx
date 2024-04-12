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
import { StudyTypeSelect } from "@/components/Select/Study/select";
import { Study } from "@/modules/study/domain/Study";
import { SubmitHandler, useForm } from "react-hook-form";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";
import { uploadStudy } from "@/modules/study/application/upload-study/uploadStudy";
interface AddLabDialogProps {
  idPatient: number | null;
}

export default function StudyDialog({ idPatient }: AddLabDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const toggleDialog = () => setIsOpen(!isOpen);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("Date", formattedDateISO);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    console.log("Datos del formulario antes de enviar:", data, idPatient);

    formData.append("StudyTypeId", data.StudyTypeId);

    if (idPatient) {
      formData.append("UserId", String(idPatient));
    }

    if (selectedFile) {
      formData.append("StudyFile", selectedFile);
    }

    formData.append("Note", data.Note);

    try {
      const studyRepository = createApiStudyRepository();
      const uploadStudyFn = uploadStudy(studyRepository);
      const uploadStudyPromise = uploadStudyFn(formData);
      toast.promise(uploadStudyPromise, {
        loading: "Subiendo estudio...",
        success: "Estudio subido con éxito!",
        error: "Error al subir el estudio",
      });
      toggleDialog();
    } catch (error) {
      console.log("Error al subir el estudio", error);
      console.error("Error al subir el estudio", error);
    }
  };

  const handleStudyChange = (study: Study) => {
    setSelectedStudy(study);
    setValue("StudyTypeId", study.id);
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
          <DialogTitle>Nuevo Estudio </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogDescription>
            <div className="w-full max-w-md mx-auto">
              <div className="mb-4">
                <Label
                  htmlFor="name"
                  className="text-black font-medium mb-2 block"
                >
                  Tipo de Estudio
                </Label>
                <StudyTypeSelect onStudyChange={handleStudyChange} />
              </div>
              <div>
                <Label
                  htmlFor="name"
                  className="text-black font-medium mb-2 block"
                >
                  Comentario *
                </Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  {...register("Note", { required: true })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-black font-medium mb-2 block"
                >
                  Archivo
                </Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800"
                  type="file"
                  onChange={(e) =>
                    setSelectedFile(e.target.files && e.target.files[0])
                  }
                />
              </div>

              {/* <div>
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
              </div> */}
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={toggleDialog}>
              Cancelar
            </Button>
            <Button variant="teal" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
