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
import { FaIdCard, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditDoctorDialog from "../Dialog/dialog";
import { EditButton } from "@/components/Button/Edit/button";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { calculateAge, formatDate, formatDni } from "@/common/helpers/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDateRange } from "react-icons/md";
const DoctorCardComponent = ({ doctor }: { doctor: Doctor | null }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Avatar className="w-16 h-16 border">
            <AvatarImage alt="Dr. John Doe" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle>Dr. {doctor?.firstName} {doctor?.lastName}</CardTitle>
            <CardDescription>Médico</CardDescription>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton id={Number(doctor?.userId)} path="usuarios/medicos" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{calculateAge(String(doctor?.birthDate))} años</span>
            </div>
            <div className="flex items-center gap-2">
              <EqualIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span> {doctor?.address?.street}, {doctor?.address?.number} -{" "}
                {doctor?.address?.city?.name},{" "}
                {doctor?.address?.city?.state.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{doctor?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIdCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDni(String(doctor?.dni))}</span>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{formatDate(String(doctor?.birthDate))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="w-full max-w-lg shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row p-4 items-start sm:items-center">
          <div className="flex-shrink-0 pb-4 sm:pb-0">
            <img
              className="w-24 h-24 rounded-full"
              src="https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              alt="Imagen del Usuario"
            />
          </div>
          <div className="flex-grow sm:pl-4">
            <CardTitle className="text-teal-700 text-lg font-bold">
              {doctor?.firstName} {doctor?.lastName}
            </CardTitle>
            <p className="text-gray-600">
              {calculateAge(String(doctor?.birthDate))} años
            </p>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <EditButton id={Number(doctor?.userId)} path="usuarios/medicos" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="p-4 border border-green-700  rounded-lg">
            <h3 className="text-lg font-semibold">ESPECIALIDADES</h3>
            <p className="text-sm font-medium">
              {doctor?.specialities
                .map((speciality) => speciality.name)
                .join(", ")}
            </p>
            <h3 className="text-lg mt-2 font-semibold">OBRA SOCIAL</h3>
            <p className="text-sm font-medium">
              {doctor?.healthInsurances
                .map(
                  (item) =>
                    item.name.charAt(0).toUpperCase() +
                    item.name.slice(1).toLowerCase()
                )
                .join(", ")}
            </p>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
};

export default DoctorCardComponent;


function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function EqualIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" x2="19" y1="9" y2="9" />
      <line x1="5" x2="19" y1="15" y2="15" />
    </svg>
  )
}


function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}


function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function StethoscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}


function SyringeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}