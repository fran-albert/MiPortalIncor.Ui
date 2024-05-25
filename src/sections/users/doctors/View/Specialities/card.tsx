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
const DoctorSpecialitiesComponent = ({ doctor }: { doctor: Doctor | null }) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Especialidades</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid gap-2">
                        {doctor?.specialities.map((speciality) => (
                            <li className="flex items-center justify-between" key={speciality.id}>
                                <span>{speciality.name}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </>
    );
};

export default DoctorSpecialitiesComponent;
