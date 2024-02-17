import CreateDoctorForm from "@/sections/users/doctors/create/CreateDoctorForm";
import React from "react";

function AddDoctorPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-200">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-40 p-10 flex justify-center items-center">
          <CreateDoctorForm />
        </div>
      </div>
    </>
  );
}

export default AddDoctorPage;
