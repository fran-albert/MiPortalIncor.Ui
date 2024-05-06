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
import "react-quill/dist/quill.snow.css";
import ActionIcon from "@/components/ui/actionIcon";
import { FaCamera, FaFilePdf, FaPlus, FaUpload } from "react-icons/fa";
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
import dynamic from "next/dynamic";
import "./dialog.style.css";
import { Textarea } from "@/components/ui/textarea";

interface HistoryDialogProps {
  //   idPatient: number | null;
  //   onStudyAdded?: (newStudy: Study) => void;
}

export default function HistoryDialog({}: //   idPatient,
//   onStudyAdded,
HistoryDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
    const formattedDateISO = dateInArgentina.format();
    setStartDate(date);
    setValue("Date", formattedDateISO);
  };

  const closeDialog = () => {
    reset();
    toggleDialog();
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);

    //   try {
    //     const uploadStudyPromise = uploadStudyFn(formData);

    //     toast.promise(uploadStudyPromise, {
    //       loading: "Subiendo estudio...",
    //       success: (responseText) => {
    //         toggleDialog();
    //         return responseText;
    //       },
    //       error: "Error al subir el estudio",
    //     });
    //   } catch (error) {
    //     console.error("Error al subir el estudio", error);
    //     toast.error("Error al subir el estudio");
    //   }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={toggleDialog}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50"
        >
          <FaPlus className="w-4 h-4 mr-2 text-teal-600" />
          <span className="text-teal-600">Nuevo Antecedente</span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg dialog-content w-full max-w-md mx-auto px-4 py-2 sm:px-6 md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo Antecedente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogDescription>
            <div className="w-full max-w-md mx-auto px-4 py-2">
              <div className="mb-6">
                <Label
                  htmlFor="title"
                  className="block text-black font-medium mb-2"
                >
                  Título
                </Label>
                <Input
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 h-10 rounded-md"
                  {...register("title", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors?.title?.type === "required" && (
                  <p className="text-red-700">Este campo es requerido.</p>
                )}
                {errors?.title?.type === "maxLength" && (
                  <p>El título no puede tener más de 20 carácteres.</p>
                )}
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="studyType"
                  className="block text-black font-medium mb-2"
                >
                  Escribe su antecedente
                </Label>
                <Textarea
                  className="w-full bg-gray-200 border-gray-300 text-gray-800 h-10 rounded-md"
                  {...register("text", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                {errors?.text?.type === "required" && (
                  <p className="text-red-700">Este campo es requerido.</p>
                )}
                {errors?.text?.type === "maxLength" && (
                  <p>First name cannot exceed 20 characters</p>
                )}
                {errors?.text?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <div className="mx-auto items-center">
              <Button variant="teal" type="submit">
                Confirmar
              </Button>
              <Button
                variant="outline"
                type="button"
                className="ml-2"
                onClick={closeDialog}
              >
                Cancelar
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
