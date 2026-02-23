import { UserCommandHandler } from "./lib/middleware";
import { getFeedByUrl, createFeedFollow } from "./lib/queries/feedFollows";

export const handlerFollow: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  const [url] = args;

  if (!url) {
    throw new Error("Usage: follow <feed-url>");
  }

  const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error(`Feed with URL ${url} not found`);
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);

  console.log(`User ${user.name} is now following feed ${feed.name}`);
};
