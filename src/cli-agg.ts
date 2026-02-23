import { scrapeFeeds } from "./lib/scrapeFeeds";
import { parseDuration } from "./lib/parseDuration";

export async function handlerAgg(cmd: string, durationStr: string) {
  const timeBetweenRequests = parseDuration(durationStr);
  console.log(`Collecting feeds every ${durationStr}`);

  // أول تنفيذ فوراً
  scrapeFeeds().catch(console.error);

  // حلقة مستمرة
  const interval = setInterval(() => {
    scrapeFeeds().catch(console.error);
  }, timeBetweenRequests);

  // التعامل مع Ctrl+C
  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}