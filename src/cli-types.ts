// src/cli-types.ts
export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;