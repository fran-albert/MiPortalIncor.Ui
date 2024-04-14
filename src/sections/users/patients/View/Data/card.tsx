import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Loading from "@/components/Loading/loading";
import { FaHeart } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineFileJpg } from "react-icons/ai";
import { IoIosBody } from "react-icons/io";
import { MdHeight } from "react-icons/md";
import { Patient } from "@/modules/patients/domain/Patient";
import { formatDate, formatDni } from "@/common/helpers/helpers";
const DataProfileCard = ({ patient }: { patient: Patient | undefined }) => {
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
                  <FaIdCard className="w-4 h-4 mr-2 text-red-600" />{" "}
                  <span className="text-sm font-medium">D.N.I.</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {formatDni(String(patient?.dni))}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <FaHeart className="w-4 h-4 mr-2 text-cyan-800" />{" "}
                  <span className="text-sm font-medium">Obra Social</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {patient?.healthPlans?.map((healthPlan) => (
                    <div key={healthPlan.id}>
                      {healthPlan.healthInsurance.name}
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdDateRange className="w-4 h-4 mr-2 text-amber-600" />{" "}
                  <span className="text-sm font-medium">
                    Fecha de Nacimiento
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {formatDate(String(patient?.birthDate))}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdPhone className="w-4 h-4 mr-2 text-green-600" />{" "}
                  <span className="text-sm font-medium">Teléfono</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {patient?.phoneNumber}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdEmail className="w-4 h-4 mr-2 text-sky-600" />{" "}
                  <span className="text-sm font-medium">
                    Correo Electrónico
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {patient?.email}
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <MdLocationOn className="w-4 h-4 mr-2 text-gray-600" />{" "}
                  <span className="text-sm font-medium">Domicilio</span>
                </div>
                <div className="text-xs text-gray-500 md:ml-10">
                  {patient?.address?.street} {patient?.address?.number} -{" "}
                  {patient?.address?.city?.name},{" "}
                  {patient?.address?.city?.state.name}
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
