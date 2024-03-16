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
import EditDoctorDialog from "../Dialog/dialog";
import { EditButton } from "@/components/Button/Edit/button";
import { Doctor } from "@/modules/doctors/domain/Doctor";
const UserCardComponent = ({ doctor }: { doctor: Doctor | null }) => {
  return (
    <>
      <Card className="w-full max-w-lg shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row p-4 items-start sm:items-center">
          <div className="flex-shrink-0 pb-4 sm:pb-0">
            {/* <img
              className="w-24 h-24 rounded-full"
              src="https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              alt="Imagen del Usuario"
            /> */}
            <FaUser className="w-24 h-24 rounded-full" />
          </div>
          <div className="flex-grow sm:pl-4">
            <CardTitle className="text-teal-700 text-lg font-bold">
              {doctor?.firstName} {doctor?.lastName}
            </CardTitle>
            <p className="text-gray-600">Agosto 22, 1985 - 32 años</p>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton id={Number(doctor?.id)} path="usuarios/medicos" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="p-4 border border-green-700  rounded-lg">
            <h3 className="text-lg font-semibold">ESPECIALIDADES</h3>
            <p>
              {doctor?.specialities
                .map((item) => item.speciality.name)
                .join(", ")}
            </p>
            <h3 className="text-lg mt-2 font-semibold">OBRA SOCIAL</h3>
            <p>
              {doctor?.healthInsurances
                .map((item) => item.name)
                .join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCardComponent;
