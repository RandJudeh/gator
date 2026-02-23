// src/cli-register.ts
import { createUser, getUserByName } from "./lib/queries/users";
import { setUser, readConfig } from "./config.js";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  // التأكد من وجود اسم المستخدم
  if (!args[0]) {
    console.error("Error: username is required for register");
    process.exit(1);
  }

  const username = args[0];

  // التحقق إذا المستخدم موجود مسبقًا
  const existingUser = await getUserByName(username);
  if (existingUser) {
    console.error("Error: user already exists");
    process.exit(1); // ← ضروري ليوافق الاختبارات
  }

  // إنشاء المستخدم الجديد
  const user = await createUser(username);
  console.log(`User created:`, user);

  // تحديث config بعد إنشاء المستخدم
  const cfg = readConfig();
  setUser(username, cfg);
  console.log(`Current user set to: ${username}`);
}
