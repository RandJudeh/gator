import { db } from "./index";
import { posts,feeds,feedFollows } from "./schema";
import { eq, and, desc } from "drizzle-orm";
export async function createPost(post: typeof posts.$inferInsert) {
  const [newPost] = await db
    .insert(posts)
    .values(post)
    .onConflictDoNothing() // يمنع الخطأ إذا url مكرر
    .returning();

  return newPost;
}

export async function getPostsForUser(
  userId: string,
  limit = 2
) {
  return await db
    .select({
      title: posts.title,
      url: posts.url,
      description: posts.description,
      publishedAt: posts.publishedAt,
      feedName: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .innerJoin(feedFollows, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}