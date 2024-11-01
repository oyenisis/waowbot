import * as dotenv from "dotenv";

const env: string | undefined = process.env["NODE_ENV"];
let file = ".env";

if (env == undefined) {
  file = ".env.production"
}

dotenv.config({ path: file });

export function getEnvironmentVariable(key: string): string {
  return process.env[key] as string;
}