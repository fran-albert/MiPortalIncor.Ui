import { IState } from "@/common/interfaces/state.interface";
import axiosInstance from "./axiosConfig";

export const getStates = async (): Promise<IState[]> => {
  try {
    const response = await axiosInstance.get("states");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
