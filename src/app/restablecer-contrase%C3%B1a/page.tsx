import Loading from "@/components/Loading/loading";
import RequestEmailPassword from "@/sections/Auth/Request-Mail-Password";
import { Suspense } from "react";

function ResetPasswordPage() {
  return (
    <>
       <Suspense fallback={<Loading isLoading />}>
        <RequestEmailPassword />
      </Suspense>
    </>
  );
}

export default ResetPasswordPage;
