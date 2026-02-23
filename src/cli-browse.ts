import { getPostsForUser } from "./lib/db/posts";

import { UserCommandHandler } from "./lib/middleware";

export const handlerBrowse: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  const limit = args[0] ? parseInt(args[0]) : 2;

  const posts = await getPostsForUser(user.id, limit);

  if (!posts.length) {
    console.log("No posts found.");
    return;
  }

  posts.forEach((post) => {
    console.log(`
${post.title}
${post.url}
From: ${post.feedName}
-----------------------
`);
  });
};