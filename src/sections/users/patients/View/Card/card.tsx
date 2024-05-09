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
import { useParams } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditPatientDialog from "../Dialog/dialog";
import { Patient } from "@/modules/patients/domain/Patient";
import { EditButton } from "@/components/Button/Edit/button";
import Image from "next/image";
import { calculateAge } from "@/common/helpers/helpers";
import useRoles from "@/hooks/useRoles";
const userRepository = createApiUserRepository();
const UserCardComponent = ({
  patient,
  registerBy,
}: {
  patient: Patient | undefined;
  registerBy: undefined | string;
}) => {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const patientImageUrl = patient?.photo
    ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png";
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <Image
            src={patientImageUrl}
            className="rounded-full"
            width={64}
            height={64}
            alt={`${patient?.firstName} ${patient?.lastName}`}
          />
          <div>
            <CardTitle className="text-teal-700 text-center">
              {patient?.firstName} {patient?.lastName}
            </CardTitle>
            <div className="text-xs italic mt-2 text-gray-500">
              Creado por {registerBy || "Desconocido"}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">
              {patient && `${calculateAge(String(patient.birthDate))} años`}
            </div>
            {isSecretary && (
              <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                <EditButton
                  id={Number(patient?.userId)}
                  path="usuarios/pacientes"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCardComponent;
