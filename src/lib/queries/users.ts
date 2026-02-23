// src/lib/db/queries/users.ts
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const user = await db.select().from(users).where(eq(users.name, name));
  return user[0]; 
}

export async function deleteAllUsers() {
  await db.delete(users).execute();
}

export async function getUsers() {
  return await db.select().from(users);
}