"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { EyeFilledIcon } from "../../components/EyeFilledIcon";
// import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function ResetPasswordForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  //   const { data: session } = useSession();

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setErrors([]);

  //     const responseNextAuth = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (responseNextAuth?.error) {
  //       setErrors(responseNextAuth.error.split(","));
  //       return;
  //     }

  //     router.push("/home");
  //   };

  //   useEffect(() => {
  //     if (session?.user) {
  //       router.push("/home");
  //     }
  //   }, [session, router]);

  return (
    <>
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          {/* <form className="flex flex-col gap-4" onSubmit={handleSubmit}> */}
          <form className="flex flex-col gap-4">
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Restablecer contraseña
            </h1>
            <div className="flex flex-col gap-4">
              <p>Enviaremos un enlace para restablecer su contraseña.</p>
              <div className="flex w-full flex-wrap gap-2">
                <Label htmlFor="email">Ingrese su correo electrónico</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0 text-red-500">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button type="submit" className="mx-auto w-1/2 md:w-1/2" variant="teal"> 
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordForm;
