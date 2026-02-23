import { db } from "../db";
import { posts,feedFollows, users, feeds } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
  const [follow] = await db
    .insert(feedFollows)
    .values({
      userId,
      feedId,
    })
    .returning();

  // نرجع البيانات مع اسم المستخدم واسم الفيد
  const result = await db
    .select({
      id: feedFollows.id,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, follow.id));

  return result[0];
}
export async function getFeedByUrl(url: string) {
  const result = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url));

  return result[0];
}

export async function getFeedFollowsForUser(userId: string) {
  return await db
    .select({
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId));
}


export async function deleteFeedFollow(userId: string, feedId: string) {
  return await db
    .delete(feedFollows)
    .where(
      and(
        eq(feedFollows.userId, userId),
        eq(feedFollows.feedId, feedId)
      )
    )
    .execute();
}

