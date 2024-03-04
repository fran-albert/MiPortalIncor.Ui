import SideBar from "./sideBar";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow ">{children}</div>
    </div>
  );
};

export default MainContainer;
