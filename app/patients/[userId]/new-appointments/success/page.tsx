import Image from "next/image";
import { FC } from "react";

import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

const SuccessPage: FC<SearchParamProps> = async ({
  searchParams: { appointmentId },
}) => {
  const appointment = (await getAppointment(
    appointmentId as string,
  )) as Appointment;
  return (
    <div>
      Success
      <Image
        src="/assets/icons/calendar.svg"
        height={24}
        width={24}
        alt="calendar"
        className="m-x-2"
      />
      <p> {formatDateTime(appointment.schedule).dateTime} </p>
    </div>
  );
};

export default SuccessPage;
