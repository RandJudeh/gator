import { db } from "../db/index";
import { feeds, users } from "../db/schema";
import { eq ,sql} from "drizzle-orm"; 
export async function createFeed(
  name: string,
  url: string,
  userId: string
) {
  const [feed] = await db
    .insert(feeds)
    .values({
      name,
      url,
      userId,
    })
    .returning();

  return feed;
}
export async function getAllFeeds() {
  const result = await db
    .select({
      feedId: feeds.id,
      feedName: feeds.name,
      feedUrl: feeds.url,
      userName: users.name,
    })
    .from(feeds)
    .leftJoin(users, eq(feeds.userId, users.id)); 

  return result;
}

export async function getFeedByUrl(url: string) {
  const result = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url));

  return result[0];
}

export async function markFeedFetched(feedId: string) {
  const now = new Date();
  await db.update(feeds)
          .set({ lastFetchedAt: now, updatedAt: now })
          .where(eq(feeds.id, feedId))
          .execute();
}


export async function getNextFeedToFetch() {
  const [feed] = await db
    .select()
    .from(feeds)
    .orderBy(sql`last_fetched_at ASC NULLS FIRST`)
    .limit(1);

  return feed;
}