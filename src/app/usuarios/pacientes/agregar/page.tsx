import CreatePatientForm from "@/sections/users/patients/create/CreatePatientForm";
import React from "react";

function AddPatientPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow mt-20 p-10 flex justify-center items-center w-full">
          <CreatePatientForm />
        </div>
      </div>
    </>
  );
}

export default AddPatientPage;
