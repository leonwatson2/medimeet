"use client"
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { AppointmentModal } from "@/components/AppointmentModal";
import { StatusBadge } from "@/components/StatusBadge";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => (
      <div>{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "patient.name",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium ">{row.original.patient.name}</p>
    )
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => (
      <div>{formatDateTime(row.original.schedule).dateOnly}</div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>)

  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            width={100}
            height={100}
            src={doctor?.image || Doctors[0].image}
            alt="doctor"
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const appointment = row.original

      return (
        <div className="flex gap-2">
          <AppointmentModal
            type="schedule"
            title="Schedule Appointment"
            description="Confirm appointment details"
            appointment={appointment}
            userId={appointment.userId}
            patientId={appointment.patient.$id} />
          <AppointmentModal
            type="cancel"
            title="Cancel Appointment"
            description="Confirm appointment details"
            appointment={appointment}
            userId={appointment.userId}
            patientId={appointment.patient.$id} />
        </div>
      )
    },
  }
]

