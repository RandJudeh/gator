// src/cli-unfollow.ts
import { getFeedByUrl,deleteFeedFollow } from "./lib/queries/feedFollows";
import { middlewareLoggedIn, UserCommandHandler } from "./lib/middleware";

export const handlerUnfollow: UserCommandHandler = async (
  cmd,
  user,
  ...args
) => {
  const url = args[0];
  if (!url) throw new Error("Feed URL required");

 
  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`Feed with URL ${url} not found`);
  }

  await deleteFeedFollow(user.id, feed.id);

  console.log(`Unfollowed feed: ${feed.name} (by ${user.name})`);
};

