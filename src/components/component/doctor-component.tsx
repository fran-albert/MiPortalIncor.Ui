import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import DoctorCardComponent from "@/sections/users/doctors/View/Card/card"
import { Doctor } from "@/modules/doctors/domain/Doctor"
import DoctorSpecialitiesComponent from "@/sections/users/doctors/View/Specialities/card"

export function DoctorComponent({ doctor }: { doctor: Doctor | null }) {
  return (
    <>
      <div className="grid md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <DoctorCardComponent doctor={doctor} />
        <div className="grid gap-6">
          <DoctorSpecialitiesComponent doctor={doctor} />
          <Card>
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
          </Card>
          <Card>
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
          </Card>
        </div>
      </div>
    </>
  )
}



function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}



function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}



function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

