"use client";
import React, { useEffect } from "react";
import { formatDateWithTime } from "@/common/helpers/helpers";
import Loading from "@/components/Loading/loading";
import DoctorCardComponent from "@/sections/users/doctors/View/Card/card";
import DoctorSpecialitiesComponent from "@/sections/users/doctors/View/Specialities/card";
import { useDoctorStore } from "@/hooks/useDoctors";
import StudiesCardComponent from "@/sections/users/patients/View/Studies/card";
export function DoctorComponent({ id }: { id: number }) {
  const { selectedDoctor, getDoctorById, isLoading, registerBy } =
    useDoctorStore();
  useEffect(() => {
    getDoctorById(id);
  }, [id, getDoctorById]);

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  const registerByText =
    registerBy?.firstName +
    " " +
    registerBy?.lastName +
    " " +
    "- " +
    formatDateWithTime(String(selectedDoctor?.registrationDate));

  return (
    <>
      <div className="grid md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <DoctorCardComponent
          doctor={selectedDoctor}
          registerBy={registerByText}
        />
        <div className="grid gap-6">
          <DoctorSpecialitiesComponent doctor={selectedDoctor} />
          <StudiesCardComponent idUser={Number(selectedDoctor?.userId)} />
          {/* <DoctorHealthInsuranceComponent doctor={doctor} /> */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Monday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tuesday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Wednesday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Thursday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span>Acme Medical Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span>456 Oak St, Anytown USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span>+1 (555) 555-5556</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Link className="text-blue-500 hover:underline" href="#">
                    www.acmeclinic.com
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </>
  );
}
