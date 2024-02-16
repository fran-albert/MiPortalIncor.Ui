"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import Loading from "@/components/Loading/loading";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      router.push("/inicio"); // Asegúrate de que la ruta es correcta
    }
  }, [session, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // const requestBody = {
    //   userName: "string",
    //   email: "string",
    //   password: "H@laH@la58",
    // };

    const result = await signIn("credentials", {
      redirect: false,
      login,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      setErrors([result.error]);
    } else {
      router.push("/inicio");
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="flex items-start justify-center p-2 mt-40">
        <div className="bg-gray-100 p-4 md:p-14 rounded-lg shadow-md w-full md:max-w-lg">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-lg md:text-2xl font-bold text-center">
              Iniciar Sesión
            </h1>
            <div className="space-y-4">
              <div>
                <Label htmlFor="login">Correo Electrónico o D.N.I.</Label>
                <Input
                  type="text"
                  name="login"
                  id="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0 text-red-500">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )} */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="bg-white" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Recordarme
              </label>
            </div>
            <Button
              type="submit"
              variant="teal"
              className="mx-auto w-1/2 md:w-1/2"
            >
              Ingresar
            </Button>
            <hr />
            <div className="text-center">
              <a href="/restablecer-contrase%C3%B1a">
                ¿Has olvidado tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
