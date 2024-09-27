"use server"
import { ID } from "node-appwrite";

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
