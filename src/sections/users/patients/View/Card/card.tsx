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
import { createApiUserRepositroy } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { useParams } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditPatientDialog from "../Dialog/dialog";
import { Patient } from "@/modules/patients/domain/Patient";
import { EditButton } from "@/components/Button/Edit/button";
import Image from "next/image";
import { calculateAge } from "@/common/helpers/helpers";
const UserCardComponent = ({ patient }: { patient: Patient | undefined }) => {
  return (
    <>
      <Card className="w-full max-w-lg shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row p-4 items-start sm:items-center">
          <div className="flex-shrink-0 pb-4 sm:pb-0">
            <Image
              src={
                patient?.photo
                  ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              className="rounded-full"
              width={96}
              height={96}
              alt="Incor Logo"
            />
          </div>
          <div className="flex-grow sm:pl-4">
            <CardTitle className="text-teal-700 text-lg font-bold">
              {patient?.firstName} {patient?.lastName}
            </CardTitle>
            <p className="text-gray-600">
              {calculateAge(String(patient?.birthDate))} años
            </p>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton
                id={Number(patient?.userId)}
                path="usuarios/pacientes"
              />
            </div>
          </div>
        </CardHeader>
        {/* <CardContent className="p-4">
          <div className="p-4 border border-green-700  rounded-lg">
            <h3 className="text-lg font-semibold">NOTAS INTERNAS</h3>
            <p>El paciente debe $3,000 en inyecciones de la consulta pasada.</p>
          </div>
        </CardContent> */}
      </Card>
    </>
  );
};

export default UserCardComponent;
