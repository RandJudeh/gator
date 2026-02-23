import { User } from "./db/schema"; 
import { readConfig } from "../config";
import { getUserByName } from "./queries/users";
export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export const middlewareLoggedIn = (
  handler: UserCommandHandler
): CommandHandler => {
  return async (cmdName: string, ...args: string[]) => {
   const config = readConfig();
  const user = config.currentUserName;
    if (!user) {
      throw new Error("No user logged in");
    }
    const user1 = await getUserByName(user);

    await handler(cmdName, user1, ...args);
  };
};


const config = readConfig();
  const currentUser = config.currentUserName;
