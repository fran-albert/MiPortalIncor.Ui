"use client";
import Link from "next/link";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import useRoles from "@/hooks/useRoles";
import { useCustomSession } from "@/context/SessionAuthProviders";
import SideBarV3 from "../sideBarV2";
import { IoMenu } from "react-icons/io5";
import { signOut } from "next-auth/react";
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

export function SideBarV2({ children }: { children: React.ReactNode }) {
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const { session, status } = useCustomSession();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideBarV3 />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Mi Portal</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="md:hidden" side="bottom">
              <div className="">
                {session && (
                  <div className="grid gap-4 p-4">
                    <Link
                      href="/inicio"
                      className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      <span>Inicio</span>
                    </Link>
                    <Link
                      href="/mi-perfil"
                      className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      <span>Mi Perfil</span>
                    </Link>
                    <>
                      {isPatient && (
                        <Link
                          href="/mis-estudios"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Mis Estudios</span>
                        </Link>
                      )}
                    </>
                    {isSecretary && (
                      <>
                        <Link
                          href="/usuarios/pacientes"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Pacientes</span>
                        </Link>
                        <Link
                          href="/usuarios/medicos"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Médicos</span>
                        </Link>
                        <Link
                          href="/especialidades"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Especialidades</span>
                        </Link>
                        <Link
                          href="/obras-sociales"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Obras Sociales</span>
                        </Link>
                        <Link
                          href="/soporte"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Soporte</span>
                        </Link>
                      </>
                    )}

                    {isDoctor && !isSecretary && (
                      <>
                        <Link
                          href="/usuarios/pacientes"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Pacientes</span>
                        </Link>
                        <Link
                          href="/especialidades"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Especialidades</span>
                        </Link>
                        <Link
                          href="/obras-sociales"
                          className="flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          <span>Obras Sociales</span>
                        </Link>
                      </>
                    )}
                    <hr />
                    <a
                      onClick={() => {
                        signOut();
                      }}
                      className="flex items-center gap-2 font-medium text-gray-900 rounded-lg  hover:bg-red-100 "
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Cerrar Sesión
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
