"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/Table/dateTable";
import { DoctorsTable } from "@/sections/users/doctors/table/table";

const DoctorsPage = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-32 p-10">
        <h1 className="text-2xl text-start font-medium mb-4">
          Lista de Médicos
        </h1>
        <DoctorsTable />
      </div>
    </div>
  );
};

export default DoctorsPage;
