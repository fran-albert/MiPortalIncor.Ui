import Loading from "@/components/Loading/loading";
import ResetPasswordForm from "@/sections/Auth/Reset-Password/ResetPasswordForm";
import { Suspense } from "react";

function ResetPasswordPage() {
  return (
    <>
       <Suspense fallback={<Loading isLoading />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}

export default ResetPasswordPage;
