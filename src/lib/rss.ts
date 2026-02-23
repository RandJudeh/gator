import { XMLParser } from "fast-xml-parser";

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  // 1️⃣ Fetch the XML
  const response = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.status}`);
  }

  const xmlText = await response.text();

  // 2️⃣ Parse XML
  const parser = new XMLParser();
  const parsed = parser.parse(xmlText);

  if (!parsed.rss || !parsed.rss.channel) {
    throw new Error("Invalid RSS feed: missing channel");
  }

  const channel = parsed.rss.channel;

  // 3️⃣ Validate metadata
  if (!channel.title || !channel.link || !channel.description) {
    throw new Error("Invalid RSS feed: missing channel metadata");
  }

  // 4️⃣ Extract items safely
  let items: RSSItem[] = [];

  if (channel.item) {
    const rawItems = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];

    for (const item of rawItems) {
      if (
        item.title &&
        item.link &&
        item.description &&
        item.pubDate
      ) {
        items.push({
          title: item.title,
          link: item.link,
          description: item.description,
          pubDate: item.pubDate,
        });
      }
    }
  }

  // 5️⃣ Return structured object
  return {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: items,
    },
  };
}
