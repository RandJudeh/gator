import { getUsers } from "./lib/queries/users";
import { readConfig } from "./config.js";

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const allUsers = await getUsers();
  const config = readConfig();
  const currentUser = config.currentUserName;

  for (const user of allUsers) {
    if (user.name === currentUser) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
}
