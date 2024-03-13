"use client";
import React, { useEffect, useState } from "react";
import { DoctorsTable } from "@/sections/users/doctors/table/table";

const DoctorsPage = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-24 p-10 bg-slate-50 min-h-screen">
        <DoctorsTable />
      </div>
    </div>
  );
};

export default DoctorsPage;
