import React from "react";
import AddDoctorForm from "./addDoctorForm";

function AddDoctorPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-200">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-40 p-10 flex justify-center items-center">
          <AddDoctorForm />
        </div>
      </div>
    </>
  );
}

export default AddDoctorPage;
