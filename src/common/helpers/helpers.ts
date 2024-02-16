import { IState } from "../interfaces/state.interface";

export function formatDni(dni: string): string {
  let dniStr = dni?.toString();
  let dniReversed = dniStr?.split("").reverse().join("");
  let dniConPuntos = dniReversed?.match(/.{1,3}/g)?.join(".") || "";
  return dniConPuntos.split("").reverse().join("");
}

export const stateName = (states: Array<IState>, idState: string): string => {
  const state = states.find((state: IState) => state.id === idState);
  return state ? state.state : "Desconocido";
};
