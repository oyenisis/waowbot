import * as dotenv from "dotenv";

dotenv.config();

export function getEnvironmentVariable(key: string): string {
  return process.env[key] as string;
}