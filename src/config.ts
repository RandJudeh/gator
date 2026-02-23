import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName?: string;
};

// --- Helpers ---
function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
  const json = JSON.stringify(
    {
      db_url: cfg.dbUrl,
      current_user_name: cfg.currentUserName ?? null,
    },
    null,
    2
  );
  fs.writeFileSync(getConfigFilePath(), json, "utf-8");
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig || typeof rawConfig !== "object") {
    throw new Error("Invalid config: not an object");
  }

  if (typeof rawConfig.db_url !== "string") {
    throw new Error("Invalid config: db_url missing or not a string");
  }

  return {
    dbUrl: rawConfig.db_url,
    currentUserName:
      typeof rawConfig.current_user_name === "string"
        ? rawConfig.current_user_name
        : undefined,
  };
}

// --- Exports ---
export function readConfig(): Config {
  const filePath = getConfigFilePath();
  if (!fs.existsSync(filePath)) {
    throw new Error(`Config file not found at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  return validateConfig(parsed);
}

export function setUser(userName: string, cfg: Config): void {
  cfg.currentUserName = userName;
  writeConfig(cfg);
}