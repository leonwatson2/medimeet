"use server";
import { ID, Query } from "node-appwrite";

import { users } from "../appwrite.config";

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

export const getUser = async (userId:string) => {
  try {
    const user = await users.get(userId);

    return user;
  } catch (error: any) {
    console.error(error);
  }
  


}
