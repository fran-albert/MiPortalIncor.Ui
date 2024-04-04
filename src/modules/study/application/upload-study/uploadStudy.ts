import { StudyRepository } from "../../domain/StudyRepository";
import { Study } from "../../domain/Study";

export function uploadStudy(studyRepository: StudyRepository) {
  return async (formData: FormData) => {
    return await studyRepository.uploadStudy(formData);
  };
}
