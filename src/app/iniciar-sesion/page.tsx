"use client";
import LoginForm from "@/sections/Auth/Login/LoginForm";
import { Login } from "@/components/component/login";

function LoginPage() {
  return (
    <div>
      <Login />
      {/* <div>
        <h2 className="text-2xl font-semibold text-center">
          Panel de Control - Secretaria
        </h2>
        <LoginForm />
      </div> */}
    </div>
  );
}

export default LoginPage;
