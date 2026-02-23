import { UserCommandHandler } from "./lib/middleware";
import { getFeedFollowsForUser } from "./lib/queries/feedFollows";

export const handlerFollowing: UserCommandHandler = async (
  cmdName,
  user
) => {
  const follows = await getFeedFollowsForUser(user.id);

  if (!follows.length) {
    console.log(`${user.name} is not following any feeds.`);
    return;
  }

  follows.forEach(f => {
    console.log(`${f.feedName} (created by ${f.userName})`);
  });
};
