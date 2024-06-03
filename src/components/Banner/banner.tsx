import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoRocket } from "react-icons/go";

const InfoBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <div className="flex justify-center my-4">
      <Alert className="flex items-center bg-teal-50 border border-teal-200 rounded-lg p-4 shadow-md w-full max-w-3xl">
        <div className="flex items-center mr-3">
          <GoRocket size={30} className="text-teal-500" />
        </div>
        <div className="flex-grow">
          <AlertTitle className="text-lg font-semibold text-teal-600">
            Nuevas Actualizaciones!
          </AlertTitle>
          <AlertDescription className="text-sm text-gray-700">
            Ahora puedes registrar pacientes sin correo electrónico y cargar
            estudios para los médicos.
          </AlertDescription>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="ml-4 text-teal-500 font-medium hover:underline"
        >
          Cerrar
        </button>
      </Alert>
    </div>
  );
};

export default InfoBanner;
