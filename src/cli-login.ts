// src/cli-login.ts
import { getUserByName } from "./lib/queries/users";
import { setUser, readConfig } from "./config.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (!args[0]) {
    console.error("Error: username is required for login");
    process.exit(1);
  }

  const username = args[0];
  const user = await getUserByName(username);

  if (!user) {
    console.error(`Error: user "${username}" does not exist`);
    process.exit(1);
  }

  const cfg = readConfig();
  setUser(username, cfg);

  console.log(`Current user set to: ${username}`);
}
