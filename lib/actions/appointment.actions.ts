"use server"
import { ID, Query } from "node-appwrite";

import { getDocumentAttributes } from "@/lib/actions/appwrite.actions";

import { APPOINTMENT_COLLECTION, databases, DB_ID } from "../appwrite.config";

export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
  const appointment = {
    ...appointmentData,
  };
  try {
    return await databases.createDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION!,
      ID.unique(),
      appointment,
    );
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to create appointment");
  }
};

export const updateAppointment = async (appointmentData: UpdateAppointmentParams) => {
  try {
    return await databases.updateDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION!,
      appointmentData.appointmentId,
      appointmentData,
    );
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to update appointment");
  }

}
export const getAppointments = async (queries: Array<string>) => {
  try {
    return await databases.listDocuments(DB_ID!, APPOINTMENT_COLLECTION!, queries);
  } catch (error: any) {
    console.error(error);
  }
};
export const getAppointmentAttributes = async () => {
  try {
    return await getDocumentAttributes("appointment");
  } catch (error: any) {
    console.error(error);
  }
};
export const getAppointment = async (appointmentId: string) => {
  try {
    return await databases.getDocument(DB_ID!, APPOINTMENT_COLLECTION!, appointmentId);
  } catch (error: any) {
    console.error(error);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(DB_ID!, APPOINTMENT_COLLECTION!, [
      Query.orderDesc('$createdAt'),
    ]);
    const counts = appointements?.documents.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduled += 1;
      } else if (appointment.status === "pending") {
        acc.pending += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelled += 1;
      }
      return acc;
    },{ scheduled: 0, pending: 0, cancelled: 0 });

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
  return data;
  } catch (error: any) {
    console.error(error);
  }
}
