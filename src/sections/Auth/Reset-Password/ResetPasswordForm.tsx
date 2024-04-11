"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  password: string;
  passwordConfirmation: string;
}

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!token) {
      toast.error("Token de restablecimiento no proporcionado.");
      return;
    }

    try {
      console.log(data);
    } catch (error) {}

    // toast
    //   .promise(
    //     axios.patch(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
    //       { resetPasswordToken: token, password: password }
    //     ),
    //     {
    //       loading: "Enviando solicitud de restablecimiento...",
    //       success: (data) => {
    //         setTimeout(() => router.push("/"), 2000);
    //         return "Contraseña actualizada con éxito!";
    //       },
    //       error: "Ocurrió un error al actualizar la contraseña.",
    //     }
    //   )
    //   .catch((error) => {
    //     if (axios.isAxiosError(error) && error.response) {
    //       setErrors([error.response.data.message]);
    //     } else {
    //       setErrors(["Ocurrió un error al intentar actualizar la contraseña."]);
    //     }
    //   });
  };

  return (
    <>
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Nueva Contraseña
            </h1>

            {/* {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0 text-red-500">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )} */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Nueva contraseña</Label>
                <PasswordInput
                  value={password}
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label htmlFor="password_confirmation">
                  Confirmar nueva contraseña
                </Label>
                <PasswordInput
                  {...register("passwordConfirmation")}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mx-auto w-1/2 md:w-1/2"
              variant="teal"
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordForm;
