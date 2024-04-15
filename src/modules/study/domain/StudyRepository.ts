import { Study } from "./Study";

export interface StudyRepository {
  getAllStudyType: () => Promise<Study[]>;
  uploadStudy: (formData: FormData) => any;
  getAllStudyByPatient: (idPatient: number) => Promise<Study[]>;
  getUrlByPatient: (idPatient: number, locationS3: string | undefined) => Promise<string>;
}
