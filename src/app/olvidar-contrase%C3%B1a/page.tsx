import Loading from "@/components/Loading/loading";
import ResetPasswordForm from "@/sections/Auth/Reset-Password/ResetPasswordForm";
import { Suspense } from "react";

function ForgotPasswordPage() {
  return (
    <>
      <Suspense fallback={<Loading isLoading />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}

export default ForgotPasswordPage;
