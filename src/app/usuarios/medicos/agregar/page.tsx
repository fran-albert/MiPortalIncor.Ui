import CreateDoctorForm from "@/sections/users/doctors/create/CreateDoctorForm";
import React from "react";

function AddDoctorPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow flex justify-center items-center bg-slate-50 min-h-full">
          <CreateDoctorForm />
        </div>
      </div>
    </>
  );
}

export default AddDoctorPage;
