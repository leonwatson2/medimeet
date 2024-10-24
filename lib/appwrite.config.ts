import * as sdk from "node-appwrite";
export const {
  PROJECT_ID,
  API_KEY,
  DB_ID,
  PATIENT_COLLECTION,
  DOCTOR_COLLECTION,
  SETTINGS_COLLECTION,
  SMS_CANCELLED_DOC_ID,
  SMS_SCHEDULED_DOC_ID,
  APPOINTMENT_COLLECTION,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_BUCKET_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
