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
import { FaEdit, FaPlus, FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const VaccineComponent = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userRepository = createApiUserRepositroy();
  const loadUser = getUser(userRepository);

  const antecedentes = [
    {
      nombre: "COVID 19 - Pfizer",
      fecha: "01/01/2021",
    },
    {
      nombre: "COVID 19 - Pfizer",
      fecha: "01/01/2021",
    },
    {
      nombre: "COVID 19 - Pfizer",
      fecha: "01/01/2021",
    },
  ];

  useEffect(() => {
    setIsLoading(true);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await loadUser(session?.user?.id);
        setProfile(userData ?? null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (!profile) {
    return null;
  }

  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Vacunas
            </h3>
            <div className="space-y-4">
              {/* Lista de antecedentes */}
              {antecedentes.map((antecedente, index) => (
                <div
                  key={index}
                  className="p-2 rounded hover:bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {antecedente.nombre}
                    </p>
                    <p className="text-gray-600 text-xs">{antecedente.fecha}</p>
                  </div>
                  <button className="ml-4 text-gray-500 hover:text-gray-700">
                    <FaEdit className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <FaPlus className="w-4 h-4 mr-2 text-teal-600" />
                <span className="text-teal-600">Nueva Vacuna</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VaccineComponent;
