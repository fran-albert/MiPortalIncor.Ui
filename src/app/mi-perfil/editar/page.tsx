import EditProfileForm from "@/sections/Profile/EditProfileForm";
import React from "react";

function EditProfilePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-40 p-10 flex justify-center items-center">
          <EditProfileForm />
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
