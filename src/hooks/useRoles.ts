import { Role } from "@/common/enums/role.enum";
import { useCustomSession } from "@/context/SessionAuthProviders";

const useRoles = () => {
  const { session } = useCustomSession();

  const isPatient = session?.user.roles.includes(Role.PACIENTE);
  const isSecretary = session?.user.roles.includes(Role.SECRETARIA);
  const isDoctor = session?.user.roles.includes(Role.MEDICO);
  const isAdmin = isPatient && isSecretary && isDoctor;

  return { isPatient, isSecretary, isDoctor, isAdmin };
};

export default useRoles;
