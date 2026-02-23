// src/cli-reset.ts
import { deleteAllUsers } from "./lib/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  try {
    await deleteAllUsers();
    console.log("Database reset: all users deleted.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to reset database:", err);
    process.exit(1); 
  }
}
