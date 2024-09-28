import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";

import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";


const SuccessPage: FC<SearchParamProps> = async ({
  searchParams: { appointmentId },
  params: { userId },
}) => {
  const appointment = (await getAppointment(
    appointmentId as string,
  )) as Appointment;
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician,
  );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/MediMeet.svg"
            height={1000}
            width={1000}
            alt="calendar"
            className="h-10 w-fit"
          />
        </Link>
        
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            className="m-x-2"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-primary">appointment request</span> has
            been submitted.
          </h2>
          <p> We will get back to you shortly. </p>
        </section>

        <section className="request-details">
          <p> Requested Appointment Details: </p>
          <div className="flex gap-2">
            <Image
              src={doctor?.image || ""}
              height={24}
              width={24}
              alt="Dr."
              className="m-x-4"
            />
            <p className="whitespace-nowrap"> Dr. {appointment.primaryPhysician} </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="success"
            />
            <p> {formatDateTime(appointment.schedule).dateTime} </p>
          </div>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointments`}>
              New Appointment
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SuccessPage;
