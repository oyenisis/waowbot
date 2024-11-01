import * as fs from "fs";
import { REST, Routes } from "discord.js";
import { getEnvironmentVariable } from "./utils/environment.js";

let commands: object[] = [];

const files = fs.readdirSync("./src/commands");
for (const file of files) {
  if (file == "command.ts") continue;

  const command = await import(`./commands/${file}`);
  commands.push(new command.default().toJson());
}

const rest = new REST().setToken(getEnvironmentVariable("DISCORD_TOKEN"));

(async () => {
  try {
    console.log(`Started loading ${commands.length} commands.`);

    const data: unknown[] = await rest.put(
      Routes.applicationCommands(getEnvironmentVariable("APP_ID")),
      { body: commands }
    ) as unknown[];

    console.log(`Successfully loaded ${data.length} commands.`);
  } catch (err) {
    console.error(err);
  }
})();