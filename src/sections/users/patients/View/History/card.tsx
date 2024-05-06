import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/modules/users/domain/User";
import { useSession } from "next-auth/react";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { FaEdit, FaPlus, FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useRoles from "@/hooks/useRoles";
import HistoryDialog from "./Dialog/dialog";

const HistoryCardComponent = () => {
  const antecedentes = [
    {
      nombre: "Antecedente 1",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 2",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 4",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 5",
      fecha: "01/01/2021",
    },
    {
      nombre: "Antecedente 3",
      fecha: "01/01/2021",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Antecedentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {antecedentes.length > 0 ? (
              <ul>
                {antecedentes.map((antecedente, index) => (
                  <div
                    key={index}
                    className="p-4 my-2 cursor-pointer hover:bg-gray-100  flex justify-between items-center"
                  >
                    <div>
                      <p className="text-black font-semibold mb-1">
                        {antecedente.nombre}
                      </p>
                      <p className="text-black text-xs">{antecedente.fecha}</p>
                      <p className="text-black text-xs">
                        Prestador: Dr. Nombre Apellido
                      </p>
                    </div>
                    <button className="ml-4 text-gray-500 hover:text-gray-700">
                      <FaEdit className="w-4 h-4 text-teal-600" />
                    </button>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-700 p-2">
                No hay antecedentes cargados.
              </div>
            )}
          </div>
          <div className="mt-4">
            <HistoryDialog
            // idPatient={idPatient}
            // onStudyAdded={onStudyAdded}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HistoryCardComponent;
