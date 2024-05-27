import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import Loading from "@/components/Loading/loading";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/inicio");
    }
  }, [session, router, status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);
    const result = await signIn("credentials", {
      redirect: false,
      userName: email,
      password: password,
    });

    setIsLoading(false);

    if (result?.error) {
      setErrors([result.error]);
    } else {
      setIsLoading(true);
      router.push("/inicio");
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:bg-gray-100 dark:lg:bg-gray-800">
          {/* <img
            alt="Image"
            className="h-full w-full object-cover"
            height="1080"
            src="/placeholder.svg"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
            }}
            width="1920"
          /> */}
        </div>
        <div className="flex items-center justify-center p-6 lg:p-10">
          {/* <div className="border-solid border-4 border-teal-500 rounded-md p-10 border-spacing-56 "> */}
          <div className="mx-auto w-[350px] space-y-6  ">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico o D.N.I.</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                <Button type="submit" variant="teal" className="w-full">
                  Ingresar
                </Button>
                <Separator />
                <div className="text-center">
                  <Link href="/restablecer-contrase%C3%B1a">
                    ¿Has olvidado tu contraseña?
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
