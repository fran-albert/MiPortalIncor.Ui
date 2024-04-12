import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading/loading";
import { FaUpload, FaWeight } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineFileJpg } from "react-icons/ai";
import { IoIosBody } from "react-icons/io";
import { MdHeight } from "react-icons/md";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { formatDni } from "@/common/helpers/helpers";
const DataProfileCard = ({ doctor }: { doctor: Doctor | null }) => {
  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Datos Personales
            </h3>
            <ul>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <MdHeight className="w-4 h-4 mr-2 text-red-600" />{" "}
                  <span className="text-sm font-medium">D.N.I.</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {formatDni(String(doctor?.dni))}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <MdHeight className="w-4 h-4 mr-2 text-red-600" />{" "}
                  <span className="text-sm font-medium">Obra Social</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {/* {doctor?.healthPlans.map((healthPlan) => (
                    <div key={healthPlan.id}>
                      {healthPlan.healthInsurance.name} - {healthPlan.name}
                    </div>
                  ))} */}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <FaWeight className="w-4 h-4 mr-2 text-amber-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">
                    Fecha de Nacimiento
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.birthDate.toLocaleString()}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <IoIosBody className="w-4 h-4 mr-2 text-green-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">Teléfono</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.phoneNumber}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <GiWeightLiftingUp className="w-4 h-4 mr-2 text-sky-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">
                    Correo Electrónico
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.email}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <GiWeightLiftingUp className="w-4 h-4 mr-2 text-sky-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">Domicilio</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {doctor?.address?.street}, {doctor?.address?.number},{" "}
                  {doctor?.address?.city?.name}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataProfileCard;
