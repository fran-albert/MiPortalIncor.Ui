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
import { User } from "@/modules/users/domain/User";
import PatientCardComponent from "@/sections/users/patients/View/Card/card";
interface ModalProps {
  patient: Patient | undefined;
  studies: Study[];
  onStudyAdded: (study: Study) => void;
  onStudyDeleted: (idStudy: number) => void;
  registerBy: undefined | string;
}
export function PatientComponent({
  patient,
  studies,
  registerBy,
  onStudyAdded,
  onStudyDeleted,
}: ModalProps) {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  return (
    // <div className="grid w-full lg:grid-cols-[280px_1fr] lg:block">
    //   <div className="flex flex-col">
    //     <main className="flex-1 p-4 md:p-6">
    //       <div className="grid gap-6 md:gap-8">
    //         <div className="user-card-container">
    //           <div className="user-card">
    //             <UserCardComponent patient={patient} registerBy={registerBy} />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    //           <DataProfileCard patient={patient} />
    //           <StudiesCardComponent
    //             studies={studies}
    //             idPatient={Number(patient?.userId)}
    //             onStudyAdded={onStudyAdded}
    //             onStudyDeleted={onStudyDeleted}
    //           />
    //           {isDoctor && (
    //             <>
    //               {/* <LabCard id={Number(patient?.userId)} /> */}
    //               {/* <HistoryCardComponent /> */}
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="grid md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <PatientCardComponent patient={patient} registerBy={registerBy} />
      <div className="grid gap-6">
        <StudiesCardComponent
          studies={studies}
          idPatient={Number(patient?.userId)}
          onStudyAdded={onStudyAdded}
          onStudyDeleted={onStudyDeleted}
        />
        <HistoryCardComponent />
        {/* <DoctorHealthInsuranceComponent doctor={doctor} /> */}
        {/* <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Monday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tuesday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Wednesday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Thursday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Friday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Saturday</span>
              <span>Closed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </CardContent>
      </Card> */}
        {/* <Card>
        <CardHeader>
          <CardTitle>Contact Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>Acme Medical Clinic</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>456 Oak St, Anytown USA</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>+1 (555) 555-5556</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Link className="text-blue-500 hover:underline" href="#">
                www.acmeclinic.com
              </Link>
            </div>
          </div>
        </CardContent>
      </Card> */}
      </div>
    </div>
  );
}
