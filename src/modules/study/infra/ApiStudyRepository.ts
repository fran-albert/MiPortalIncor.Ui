import axiosInstance from "@/services/axiosConfig";
import { StudyRepository } from "../domain/StudyRepository";
import { Study } from "../domain/Study";
import axios from "axios";

export function createApiStudyRepository(): StudyRepository {
  async function getAllStudyType(): Promise<Study[]> {
    const response = await axiosInstance.get("StudyType/all");
    const studies = response.data as Study[];
    return studies;
  }

  async function uploadStudy(formData: FormData) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}Study/upload-study`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  return {
    getAllStudyType,
    uploadStudy,
  };
}
