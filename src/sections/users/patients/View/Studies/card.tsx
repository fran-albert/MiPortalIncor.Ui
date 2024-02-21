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
import { FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
const StudiesCardComponent = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userRepository = createApiUserRepositroy();
  const loadUser = getUser(userRepository);

  useEffect(() => {
    setIsLoading(true);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await loadUser(
          session?.user?.id,
          session?.accessToken || ""
        );
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
              Archivos
            </h3>
            <ul>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <FaRegFilePdf className="w-4 h-4 mr-2 text-red-600" />
                  <span className="text-sm font-medium">
                    EstudiosSangre.pdf
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  250KB | Feb 22, 2024
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-gray-100 mt-2">
                <div className="flex items-center">
                  <AiOutlineFileJpg className="w-4 h-4 mr-2 text-blue-600" />{" "}
                  {/* Reemplaza con tu ícono de imagen */}
                  <span className="text-sm font-medium">
                    Radiografia-01.jpg
                  </span>
                </div>
                <div className="text-xs text-gray-500">6MB | Dic 13, 2023</div>
              </li>
            </ul>
            <div className="mt-4">
              <button className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <FaUpload className="w-4 h-4 mr-2 text-teal-600" />
                <span className="text-teal-600">Adjuntar Archivo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudiesCardComponent;
