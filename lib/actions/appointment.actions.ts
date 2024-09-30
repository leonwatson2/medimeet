/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { getDocumentAttributes } from "@/lib/actions/appwrite.actions";
import { formatDateTime } from "@/lib/utils";

import { APPOINTMENT_COLLECTION, databases, DB_ID, messaging } from "../appwrite.config";

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

export const updateAppointment = async ({ userId, appointmentId, appointment }: UpdateAppointmentParams) => {
  try {
    const updatedDoc = await databases.updateDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION!,
      appointmentId,
      appointment,
    );
    revalidatePath("/admin");
  
    const smsMessage = `Your appointment has been ${appointment.status} for ${formatDateTime(appointment.schedule).dateTime}`;
    sendSMSNotification(userId, smsMessage); 

    return updatedDoc;
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
    const counts = appointments?.documents.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduled += 1;
      } else if (appointment.status === "pending") {
        acc.pending += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelled += 1;
      }
      return acc;
    }, { scheduled: 0, pending: 0, cancelled: 0 });

    const data = {
      totalCount: appointments.total,
      counts,
      documents: appointments.documents,
    };
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

export const sendSMSNotification = async (userId:string, content:string) => {

  try {
    const messageResponse = await messaging.createSms(ID.unique(), content, [], [userId]);
    return messageResponse;
  } catch (error: any) {
    console.error(error);
  }
}


















