import Parser from "rss-parser";
import { getNextFeedToFetch, markFeedFetched } from "./queries/feeds";
import { createPost } from "./db/posts";

const parser = new Parser();

export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();

  if (!feed) {
    console.log("No feeds to fetch.");
    return;
  }

  console.log(`Fetching feed: ${feed.name} (${feed.url})`);

  try {
    const parsed = await parser.parseURL(feed.url);

    for (const item of parsed.items) {
   
      const dateString =
        item.isoDate ||
        item.pubDate ||
        item.updated;

      let publishedAt: Date | null = null;

      if (dateString) {
        const parsedDate = new Date(dateString);
        if (!isNaN(parsedDate.getTime())) {
          publishedAt = parsedDate;
        }
      }

      await createPost({
        title: item.title ?? "No title",
        url: item.link ?? "",
        description:
          item.contentSnippet ||
          item.content ||
          null,
        publishedAt,
        feedId: feed.id,
      });
    }

    await markFeedFetched(feed.id);

  } catch (err) {
    console.error(`Failed to fetch ${feed.url}:`, err);
  }
}