"use client";
import { SpecialityTable } from "@/sections/users/secretary/Especiality/table/table";
import React from "react";

function SpecialityPage() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-24 p-10 bg-slate-50">
        <SpecialityTable />
      </div>
    </div>
  );
}

export default SpecialityPage;
