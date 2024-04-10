import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment-timezone';

type SetDateFunction = (date: Date) => void;
type SetValueFunction = (field: string, value: any) => void;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const goBack = () => {
  window.history.back();
};

export const handleDateChange = (
  date: Date,
  setStartDate: SetDateFunction,
  setValue: SetValueFunction
) => {
  const dateInArgentina = moment(date).tz("America/Argentina/Buenos_Aires");
  const formattedDateISO = dateInArgentina.format();
  setStartDate(date);
  setValue("birthDate", formattedDateISO);
};