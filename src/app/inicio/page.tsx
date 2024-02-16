"use client";
import withSessionTimeout from "@/components/withSessionTimeout";
import WelcomeCardComponent from "@/sections/Profile/WelcomeCard";

function HomePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-40">
          <WelcomeCardComponent />
        </div>
      </div>
    </>
  );
}

export default withSessionTimeout(HomePage);
