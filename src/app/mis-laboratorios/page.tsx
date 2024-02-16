"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./Table/columns";
import { DataTable } from "@/components/Table/dateTable";

async function LabsPage() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // try {
      //   const userData = await getLabsByUser();
      //   console.log(userData);
      //   setLabs(userData);
      // } catch (error) {
      //   console.log(error);
      // }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-40 p-10 ">
        <h1 className="text-3xl text-center font-bold mb-10">
          Mis Laboratorios
        </h1>
        <DataTable columns={columns} data={labs} />
      </div>
    </div>
  );
}

export default LabsPage;
