import { SideBarV2 } from "./component/side-bar-v2";
import SideBar from "./sideBar";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    // <div className="flex">
    //   <SideBar />
    //   <div className="flex-grow ">{children}</div>
    // </div>
    <SideBarV2 children={children} />
  );
};

export default MainContainer;
