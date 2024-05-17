"use client";
import LoginForm from "@/sections/Auth/Login/LoginForm";
import { SideBarV2 } from "./component/side-bar-v2";
import SideBar from "./sideBar";
import { Login } from "@/components/component/login";
import { usePathname } from "next/navigation";
import { NavBar } from "./component/nav-bar";
interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const pathname = usePathname();
  return (
    // <div className="flex">
    //   <SideBar />
    //   <div className="flex-grow ">{children}</div>
    // </div>
    // <SideBarV2 children={children} />
    <>
      {
        pathname === "/iniciar-sesion" ? (
          <>
            <NavBar />
            <div className="flex items-center justify-center h-full">
              <Login />
            </div>
          </> // Muestra el componente Login solo en la ruta '/iniciar-sesion'
        ) : (
          // <LoginForm /> // Muestra el componente Login solo en la ruta '/iniciar-sesion'
          <SideBarV2 children={children} />
        ) // De lo contrario, muestra el layout normal con SideBarV2
      }
    </>
  );
};

export default MainContainer;
