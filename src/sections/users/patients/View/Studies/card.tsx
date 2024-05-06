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
import useRoles from "@/hooks/useRoles";

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
  const { isPatient, isSecretary, isDoctor } = useRoles();
  useEffect(() => {
    const fetchUrls = async () => {
      if (studies) {
        const studyRepository = createApiStudyRepository();
        const newUrls: UrlMap = {};

        for (const study of studies) {
          const url = await studyRepository.getUrlByPatient(
            idPatient,
            study.locationS3
          );
          newUrls[study.id] = url;
        }

        setUrls(newUrls);
      }
    };

    fetchUrls();
  }, [studies]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Estudios</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col justify-between h-full">
            <div>
              {studies?.length > 0 ? (
                <div className="rounded-lg overflow-hidden">
                  {studies.map((study) => (
                    <div
                      key={study.id}
                      onClick={() => window.open(urls[study.id], "_blank")}
                      className="grid grid-cols-[50px_1fr] gap-4 items-center p-2 cursor-pointer rounded hover:bg-gray-100"
                    >
                      <FaRegFilePdf className="w-8 h-8 text-red-600" />
                      <div className="grid gap-1">
                        <span className="text-sm font-medium">
                          {study?.note}
                        </span>
                        <div className="text-xs text-gray-500">
                          {formatDate(String(study.date))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-700 p-2">
                  No hay estudios cargados.
                </div>
              )}
            </div>
            {isSecretary && (
              <div className="mt-auto">
                <StudyDialog
                  idPatient={idPatient}
                  onStudyAdded={onStudyAdded}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StudiesCardComponent;
