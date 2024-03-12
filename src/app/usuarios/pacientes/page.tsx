"use client";
import React from "react";
import { PatientTable } from "@/sections/users/patients/table/table";

const PatientsPage = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-24 p-10 bg-slate-50 min-h-screen">
        <PatientTable />
      </div>
    </div>
  );
};

export default PatientsPage;
