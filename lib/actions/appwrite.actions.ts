import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { storage, BUCKET_ID, databases, PATIENT_COLLECTION, APPOINTMENT_COLLECTION, DOCTOR_COLLECTION, DB_ID } from "@/lib/appwrite.config";


export const uploadFile = async (file: FormData | undefined) => {
  if (file) {
    const inputFile = InputFile.fromBuffer(
      file?.get("blobFile") as Blob,
      file?.get("fileName") as string,
    );
    return await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
  }
  return null;
};

export const deleteFile = async (fileId:string) => {
 return storage.deleteFile(BUCKET_ID!, fileId)

}

export const listFiles = async () => {
  return storage.listFiles(BUCKET_ID!)
}

export const getDocumentAttributes = async (collection: 'appointment' | 'patient' | 'doctor') => {
  const COLLECTION_ID = {
    appointment: APPOINTMENT_COLLECTION!,
    patient: PATIENT_COLLECTION!,
    doctor: DOCTOR_COLLECTION! 
  }[collection]
  return await databases.listAttributes(
    DB_ID!, 
    COLLECTION_ID, 
    [] 
  );
}
