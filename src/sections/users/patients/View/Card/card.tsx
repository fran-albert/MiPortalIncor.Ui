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
const UserCardComponent = ({ patient }: { patient: Patient | undefined }) => {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex-shrink-0 pb-4 sm:pb-0">
            <Image
              src={
                patient?.photo
                  ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${patient.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              className="rounded-full"
              width={64}
              height={64}
              alt="Incor Logo"
            />
          </div>
          <CardTitle className="text-teal-700">
            {patient?.firstName} {patient?.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">
              {" "}
              {calculateAge(String(patient?.birthDate))} años
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isSecretary && (
                <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  <EditButton
                    id={Number(patient?.userId)}
                    path="usuarios/pacientes"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCardComponent;
