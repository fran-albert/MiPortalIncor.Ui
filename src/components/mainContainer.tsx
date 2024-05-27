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
    <>
      {
        pathname === "/iniciar-sesion" ? (
          <>
            <NavBar />
            <div className="flex items-center justify-center h-full">
              <Login />
            </div>
          </> 
        ) : (
          <SideBarV2>{children}</SideBarV2>
        )
      }
    </>
  );
};

export default MainContainer;
