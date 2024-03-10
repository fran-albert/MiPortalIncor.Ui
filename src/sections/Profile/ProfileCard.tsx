// import { formatDate, formatearDNI, stateName } from "@/common/Utils";
import { useEffect, useState } from "react";
// import ChangePasswordModal from "./change.password";
// import toast, { Toaster } from "react-hot-toast";
// import LoadingPage from "@/components/Loading";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
// import { State } from "@/common/interfaces/state.interface";
// import EditUserModal from "./edit.user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CitySelect } from "@/components/Select/City/select";
import { StateSelect } from "@/components/Select/State/select";
import { HealthInsuranceSelect } from "@/components/Select/Health Insurance/select";
import { createApiUserRepositroy } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import { User } from "@/modules/users/domain/User";
import { formatDni } from "@/common/helpers/helpers";

export default function ProfileCardComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<User | undefined>({} as User);
  console.log(id, "id");

  useEffect(() => {
    const userRepository = createApiUserRepositroy();
    const loadUser = getUser(userRepository);

    const fetchUsers = async () => {
      try {
        const userData = await loadUser(id);
        setProfile(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const handleEditPassword = () => {
    setOpenModal(true);
  };

  //   if (!user || !states) {
  //     return <LoadingPage props="Cargando tu perfil..." />;
  //   }

  return (
    <>
      <div className="flex items-center justify-center bg-white border shadow-2xl rounded-lg p-4 w-1/2">
        <div className="relative p-8 rounded-xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <Avatar>
              <AvatarImage
                src={
                  //   profile.photo
                  // ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${profile.photo}`

                  "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
              />
              <AvatarFallback>Imagen del Usuario</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-xl font-bold m-2">Mi Perfil</p>
            </div>
            <div>
              <Button variant="ghost" className=" text-white p-2 rounded-full">
                <Link href="/mi-perfil/editar">
                  <FaPencilAlt size={20} color="#0d9488" />
                </Link>
              </Button>
            </div>
          </div>
          <Separator />
          <hr />
          <div className="flex justify-center mb-4">
            {/* <Avatar
          src={
            previewUrl ||
            (user?.photo
              ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${user?.photo}`
              : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png")
          }
          className="w-20 h-20 text-large"
        /> */}

            {/* <Avatar
              src={
                previewUrl ||
                (user?.photo
                  ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${user?.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png")
              }
              className="w-20 h-20 text-large"
            /> */}
          </div>
          {/* <div className="flex justify-center mb-4">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              isIconOnly
              variant="faded"
              aria-label="Take a photo"
              onClick={() => {
                const fileInput = document.getElementById("file");
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              <FaCamera size={20} color="#0d9488" />
            </Button>
          </div> */}

          {/* <h2 className="text-xl font-medium text-center mb-2 text-gray-700">
            {user?.name} {user?.lastname}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            {user?.role ? user.role.join(" - ") : "No roles"}
          </p> */}

          <div className="flex flex-row">
            <div className="flex-1 pr-1">
              <div className="mb-2 block ">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  name="name"
                  id="name"
                  className="bg-gray-200 text-gray-700"
                  value={profile?.firstName || ""}
                />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  name="lastname"
                  id="lastname"
                  className="bg-gray-200 text-gray-700"
                  value={profile?.lastName || ""}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 pr-1">
              <div className="mb-2 block">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  name="phone"
                  id="phone"
                  className="bg-gray-200 text-gray-700"
                  value={profile?.phoneNumber || ""}
                />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="healthInsurance">Obra Social</Label>
                <HealthInsuranceSelect />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 pr-1">
              <div className="mb-2 block">
                <Label htmlFor="dni">D.N.I</Label>
                <Input
                  name="dni"
                  className="bg-gray-200 text-gray-700"
                  id="dni"
                  defaultValue={
                    profile?.userName
                      ? formatDni(profile?.userName)
                      : ""
                  }
                />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                <Input
                  name="birthdate"
                  id="birthdate"
                  className="bg-gray-200 text-gray-700"
                  //  value={user?.birthDate ? formatDate(user.birthDate) : ""}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 pr-1">
              <div className="mb-2 block">
                <Label htmlFor="state">Provincia</Label>
                <StateSelect />
              </div>
            </div>
            <div className="flex-1 pl-1">
              <div className="mb-2 block">
                <Label htmlFor="city">Localidad</Label>
                <CitySelect />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="apellido">Correo Electrónico</Label>
              <Input
                name="email"
                id="email"
                className="bg-gray-200 text-gray-700"
                value={profile?.email || ""}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="mt-10 m-2 font-medium"
              variant="outline"
              onClick={handleEditPassword}
            >
              Cambiar Contraseña
            </Button>
            <Button
              className="mt-10 m-2 font-medium"
              variant="teal"
              onClick={handleEditPassword}
            >
              Modificar Datos
            </Button>
          </div>
        </div>
      </div>
      {/* <ChangePasswordModal
        isOpen={openModal}
        onOpenChange={setOpenModal}
        user={user}
      /> */}
    </>
  );
}
