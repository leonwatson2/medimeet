import { ID } from "node-appwrite";
import { storage, BUCKET_ID } from "@/lib/appwrite.config";

import { InputFile } from "node-appwrite/file";

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
