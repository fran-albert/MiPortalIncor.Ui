"use client";
import AppointmentCardComponent from "@/sections/users/patients/View/Appointment/card";
import UserCardComponent from "@/sections/users/patients/View/Card/card";
import HistoryCardComponent from "@/sections/users/patients/View/History/card";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
import VaccineComponent from "@/sections/users/patients/View/Vaccine/card";
import VitalSignCard from "@/sections/users/patients/View/VitalSigns/card";
import React from "react";

function UserPage() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-64 w-full"></div>
      <div className="flex-grow mt-24 p-3 md:p-0 bg-slate-100">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-1 md:mr-3">
            <div className="m-4">
              <UserCardComponent />
            </div>
            <div className="m-4">
              <VitalSignCard />
            </div>
            <div className="m-4">
              <StudiesCardComponent />
            </div>
          </div>
          <div className="flex-1 md:mt-0 mt-3">
            <div className="m-4">
              <HistoryCardComponent />
            </div>
            <div className="m-4">
              <VaccineComponent />
            </div>
          </div>
          <div className="flex-1 md:mt-0 mt-3">
            <div className="m-4">
              <AppointmentCardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
