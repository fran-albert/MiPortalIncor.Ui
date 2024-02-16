import EditPatientForm from "@/sections/users/patients/edit/EditPatientForm";
import React from "react";

function EditPatientPage() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-200">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-36 p-10 flex justify-center items-center">
        <EditPatientForm />
      </div>
    </div>
  );
}

export default EditPatientPage;
