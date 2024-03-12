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
const UserCardComponent = ({ user }: { user: User | null }) => {
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
              {user?.firstName} {user?.lastName}
            </CardTitle>
            <p className="text-gray-600">Agosto 22, 1985 - 32 años</p>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <button>Editar Datos</button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="p-4 border border-green-700  rounded-lg">
            <h3 className="text-lg font-semibold">NOTAS INTERNAS</h3>
            <p>El paciente debe $3,000 en inyecciones de la consulta pasada.</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCardComponent;
