

#  README.md

# Gator CLI

 # Gator is a small command-line program that lets you follow RSS feeds and see the latest posts right in your terminal.  
 # I built it so you can stay updated without opening a browser.

## What you need
# To run Gator you need:

# - Node.js (v18+)
# - PostgreSQL database
# - npm or yarn

## How to set it up

1. Clone the project:

```bash
git clone https://github.com/randjudeh/gator.git
cd gator
````

2. Install dependencies:

```bash
npm install
```

3. Create a PostgreSQL database and make sure your user can access it.

4. Set up your config file `drizzle.config.ts` with your database info. Something like:

```ts
export default {
  driver: "pg",
  dbCredentials: {
    database: "gator",
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432
  },
  schema: "./src/lib/db/schema.ts",
};
```

5. Run the migrations:

```bash
npx drizzle-kit migrate
```

---

## How to run

Use `npm start` followed by a command. For example:

* `npm start register <username>` – to create a user
* `npm start login <username>` – to log in
* `npm start addfeed <name> <url>` – to add a feed
* `npm start follow <feed-url>` – to follow a feed
* `npm start browse [limit]` – to see the latest posts (default limit is 2)
* `npm start agg <interval>` – to fetch posts from feeds every few seconds

---

## Example

```bash
npm start register rand
npm start login rand
npm start addfeed "BBC" https://feeds.bbci.co.uk/news/rss.xml
npm start agg 10s
npm start browse 5
```

