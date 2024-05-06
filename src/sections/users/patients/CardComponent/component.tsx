import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import UserCardComponent from "@/sections/users/patients/View/Card/card";
import Image from "next/image";
import { calculateAge, formatDate } from "@/common/helpers/helpers";
import { EditButton } from "../../../../components/Button/Edit/button";
import LabCard from "@/sections/users/patients/View/Lab/card";
import { LabPatientTable } from "@/sections/users/patients/View/Lab/Table/table";
import HistoryCardComponent from "@/sections/users/patients/View/History/card";
import { FaEdit } from "react-icons/fa";
import HistoryDialog from "@/sections/users/patients/View/History/Dialog/dialog";
import { Study } from "@/modules/study/domain/Study";
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
import { formatDni } from "@/common/helpers/helpers";
import "./style.css";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
import useRoles from "@/hooks/useRoles";
import StudyDialog from "@/sections/users/patients/View/Studies/Dialog/dialog";
import DataProfileCard from "@/sections/users/patients/View/Data/card";
interface ModalProps {
  patient: Patient | undefined;
  studies: Study[];
  onStudyAdded: (study: Study) => void;
}
export function PatientCardComponent({
  patient,
  studies,
  onStudyAdded,
}: ModalProps) {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] mt-24 lg:block">
      <div className="flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6 md:gap-8">
            <div className="user-card-container">
              <div className="user-card">
                <UserCardComponent patient={patient} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <DataProfileCard patient={patient} />
              <StudiesCardComponent
                studies={studies}
                idPatient={Number(patient?.userId)}
                onStudyAdded={onStudyAdded}
              />
              {isDoctor && (
                <>
                  {/* <LabCard id={Number(patient?.userId)} /> */}
                  {/* <HistoryCardComponent /> */}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
