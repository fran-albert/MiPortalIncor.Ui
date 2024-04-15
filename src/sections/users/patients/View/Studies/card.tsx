import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/modules/users/domain/User";
import { useSession } from "next-auth/react";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { getUser } from "@/modules/users/application/get/getUser";
import Loading from "@/components/Loading/loading";
import { FaUpload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileJpg } from "react-icons/ai";
import StudyDialog from "./Dialog/dialog";
import { Patient } from "@/modules/patients/domain/Patient";
import { Study } from "@/modules/study/domain/Study";
import { formatDate } from "@/common/helpers/helpers";
import { createApiStudyRepository } from "@/modules/study/infra/ApiStudyRepository";


interface UrlMap {
  [key: number]: string;
}


const StudiesCardComponent = ({
  studies,
  idPatient,
  onStudyAdded,
}: {
  studies: Study[];
  idPatient: number;
  onStudyAdded?: (newStudy: Study) => void;
}) => {

  const [urls, setUrls] = useState<UrlMap>({});

  useEffect(() => {
    const fetchUrls = async () => {
      if (studies) {  // Asegúrate de que studies está definido antes de usarlo
        const studyRepository = createApiStudyRepository();
        const newUrls: UrlMap = {}

        for (const study of studies) {
          const url = await studyRepository.getUrlByPatient(idPatient, study.locationS3);
          newUrls[study.id] = url;
        }

        setUrls(newUrls);
      }
    };

    fetchUrls();
  }, [studies]);


  return (
    <>
      <div className="flex sm:mx-auto">
        <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md w-full max-w-lg">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 bg-gray-100 p-2">
              Archivos
            </h3>
            <ul>
              {studies?.map((study) => (
                <li
                  key={study.id}
                  onClick={() => window.open(urls[study.id], "_blank")}
                  className="flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-100"
                >
                  <div className="flex items-center ">
                    <FaRegFilePdf className="w-4 h-4 mr-2 text-red-600" />
                    <span className="text-sm font-medium">{study.note}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(String(study.date))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <StudyDialog idPatient={idPatient} onStudyAdded={onStudyAdded} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudiesCardComponent;
