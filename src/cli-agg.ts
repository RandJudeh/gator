import { scrapeFeeds } from "./lib/scrapeFeeds";
import { parseDuration } from "./lib/parseDuration";

export async function handlerAgg(cmd: string, durationStr: string) {
  const timeBetweenRequests = parseDuration(durationStr);
  console.log(`Collecting feeds every ${durationStr}`);

  scrapeFeeds().catch(console.error);

  const interval = setInterval(() => {
    scrapeFeeds().catch(console.error);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}