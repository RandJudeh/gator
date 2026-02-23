import { UserCommandHandler } from "./lib/middleware";
import { createFeed } from "./lib/queries/feeds";
import { createFeedFollow } from "./lib/queries/feedFollows";

export const handlerAddFeed: UserCommandHandler = async (_, user, name, url) => {
  if (!name || !url) {
    throw new Error("Feed name and URL are required");
  }

  // إنشاء الـ feed
  const feed = await createFeed(name, url, user.id);
  console.log(`Feed added: ${feed.name} (${feed.url}) by ${user.name}`);

  // متابعة تلقائية
  await createFeedFollow(user.id, feed.id);
};
