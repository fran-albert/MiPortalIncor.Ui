import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useRoles from "@/hooks/useRoles";
import { useCustomSession } from "@/context/SessionAuthProviders";
import { GiHospitalCross } from "react-icons/gi";
import { useRouter, usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import {
  FaUsers,
  FaHome,
  FaUser,
  FaFileMedicalAlt,
  FaFilePdf,
  FaHeadset,
} from "react-icons/fa";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";

function SideBarV3() {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const { session, status } = useCustomSession();
  return (
    <>
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="https://incorcentromedico.com.ar"
            >
              <Image
                src="https://incorcentromedico.com.ar/wp-content/uploads/2018/07/incor-logo-768x277%20(2)%20(1).png"
                width={180}
                height={100}
                alt="Incor Logo"
              />
            </Link>
          </div>
          {session && (
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium list-none">
                <li>
                  <Link
                    href="/inicio"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                  >
                    <FaHome size={25} color="#0d9488" />
                    <span className="ml-3">Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mi-perfil"
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                  >
                    <FaUser size={25} color="#0d9488" />
                    <span className="ml-3">Mi Perfil</span>
                  </Link>
                </li>

                <>
                  {isPatient && (
                    <li>
                      <Link
                        href="/mis-estudios"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <FaFileMedicalAlt size={25} color="#0d9488" />
                        <span className="ml-3">Mis Estudios</span>
                      </Link>
                    </li>
                  )}
                </>
                {/* Conditional Section for Doctors */}
                {isSecretary && (
                  <>
                    <li className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                      Gestionar
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/usuarios/pacientes"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <FaUsers size={25} color="#0d9488" />
                        <span className="ml-3">Pacientes</span>
                      </Link>
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/usuarios/medicos"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <FaUserDoctor size={25} color="#0d9488" />
                        <span className="ml-3">Médicos</span>
                      </Link>
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/especialidades"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <GiHospitalCross size={25} color="#0d9488" />
                        <span className="ml-3">Especialidades</span>
                      </Link>
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/obras-sociales"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <MdHealthAndSafety size={25} color="#0d9488" />
                        <span className="ml-3">Obras Sociales</span>
                      </Link>
                    </li>
                    <li className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                      Reportes
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/soporte"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer mb-2"
                      >
                        <FaHeadset size={25} color="#0d9488" />
                        <span className="ml-3">Soporte</span>
                      </Link>
                    </li>
                  </>
                )}

                {isDoctor && !isSecretary && (
                  <>
                    <li className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                      Usuarios
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/usuarios/pacientes"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <FaUsers size={25} color="#0d9488" />
                        <span className="ml-3">Pacientes</span>
                      </Link>
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/especialidades"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <GiHospitalCross size={25} color="#0d9488" />
                        <span className="ml-3">Especialidades</span>
                      </Link>
                    </li>
                    <li className="pl-5">
                      <Link
                        href="/obras-sociales"
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                      >
                        <MdHealthAndSafety size={25} color="#0d9488" />
                        <span className="ml-3">Obras Sociales</span>
                      </Link>
                    </li>
                  </>
                )}
                <hr />
                <li>
                  <a
                    onClick={() => {
                      signOut();
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-red-100  group cursor-pointer mt-2"
                  >
                    <FiLogOut size={25} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Cerrar Sesión
                    </span>
                  </a>
                </li>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBarV3;
