import { getAllFeeds } from "./lib/queries/feeds";

export async function handlerFeeds() {
  const allFeeds = await getAllFeeds();

  if (allFeeds.length === 0) {
    console.log("No feeds found.");
    return;
  }

  allFeeds.forEach((feed) => {
    console.log(`* ${feed.feedName}`);
    console.log(`  URL: ${feed.feedUrl}`);
    console.log(`  Added by: ${feed.userName}\n`);
  });
}
