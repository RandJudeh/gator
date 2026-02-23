import { handlerRegister } from "./cli-register";
import { handlerLogin } from "./cli-login";
import { handlerReset } from "./cli-reset"; 
import { handlerUsers } from "./cli-users";
import { handlerAgg } from "./cli-agg";
import { handlerAddFeed } from "./cli-addfeed";
import { handlerFeeds } from "./cli-feeds";
import { handlerFollow } from "./cli-follow";
import { handlerFollowing } from "./cli-following";
import {handlerUnfollow} from "./cli-unfollow";
import { middlewareLoggedIn } from "./lib/middleware";
import { handlerBrowse } from "./cli-browse";
async function runCommand(cmd: string, ...args: string[]) {
  switch(cmd) {
     case "unfollow":
  await middlewareLoggedIn(handlerUnfollow)(cmd, ...args);
  break;

    case "register":
      await handlerRegister(cmd, ...args);
      break;
    case "login":
      await handlerLogin(cmd, ...args);
      break;
    case "reset":
      await handlerReset(cmd, ...args); 
      break;
    case "users":
      await handlerUsers(cmd, ...args);
      break;
    case "addfeed":
      await middlewareLoggedIn(handlerAddFeed)(cmd, ...args);
      break;
    case "feeds":
      await middlewareLoggedIn(handlerFeeds)(cmd, ...args);
      break;
    case "follow":  
      await middlewareLoggedIn(handlerFollow)(cmd, ...args);
      break;
    case "following":
      await middlewareLoggedIn(handlerFollowing)(cmd, ...args);
      break;
    case "agg":
      if (!args[0]) {
         console.error("Usage: agg <time_between_requests>");
         process.exit(1);
          }
        await handlerAgg(cmd, args[0]);
      break;
    case "browse":
      await middlewareLoggedIn(handlerBrowse)(cmd, ...args);
      break;
    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
  }
}

async function main() {
  const [,,cmd, ...args] = process.argv;
  try {
    await runCommand(cmd, ...args);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
  process.exit(0);
}

main();
