"use server";
import { ID, Query } from "node-appwrite";

import { deleteFile, uploadFile } from "@/lib/actions/appwrite.actions";

import {
  BUCKET_ID,
  databases,
  DB_ID,
  ENDPOINT,
  PATIENT_COLLECTION,
  PROJECT_ID,
  users,
} from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const createdUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return createdUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([Query.equal("email", user.email)]);
      return existingUser.users[0];
    }
    console.error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return user;
  } catch (error: any) {
    console.error(error);
  }
};
export const createPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  const file = await uploadFile(identificationDocument);
  try {
    const newPatient = await databases.createDocument(
      DB_ID!,
      PATIENT_COLLECTION!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?${PROJECT_ID!}`,
        ...patient,
      },
    );
    return newPatient;
  } catch (error: any) {
    console.log(error);
    if(file?.$id)
      await deleteFile(file?.$id)
    throw new Error("Something went wrong creating the patient")
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      DB_ID!,
      PATIENT_COLLECTION!,
      [Query.equal("userId", userId)],
    );
    return patient.documents[0];
  } catch (error: any) {
    console.error(error);
  }
}
