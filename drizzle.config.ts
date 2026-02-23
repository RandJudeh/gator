
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config";

// قراءة config من ملف JSON
const cfg = readConfig();

export default defineConfig({
  schema: "src/lib/db/schema.ts",        // مكان ملف الـ schema
  out: "src/lib/db/migrations",          // مكان حفظ ملفات المايغريشن بعد الإنشاء
  dialect: "postgresql",
  dbCredentials: {
    url: cfg.dbUrl,                      // سلسلة الاتصال من config
  },
});
