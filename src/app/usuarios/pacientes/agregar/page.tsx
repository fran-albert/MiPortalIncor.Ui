import CreatePatientForm from "@/sections/users/patients/create/CreatePatientForm";
import React from "react";

function AddPatientPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 w-full"></div>
        <div className="flex-grow flex justify-center items-center bg-slate-50 min-h-screen">
          <CreatePatientForm />
        </div>
      </div>
    </>
  );
}

export default AddPatientPage;
