import { initClient } from "./client";
import { Command } from "./commands/command";
import { ClientEventHandler } from "./events/client-event-handler";
import { User } from "./models/user";
import { MySqlService } from "./services/mysql-service";
import { SqlDatabaseService } from "./services/sql-database-service";
import { SqliteService } from "./services/sqlite-service";
import { getEnvironmentVariable } from "./utils/environment";
import { setupDatabase } from "./utils/setup-database";
import * as fs from "fs";

let commands: {} = {};

const files = fs.readdirSync("./src/commands");
for (const file of files) {
  if (file == "command.ts") continue;

  const command = await import(`./commands/${file}`);
  const obj = new command.default();
  commands[obj.name] = obj;
}

const eventHandler: ClientEventHandler = {
  ready(client) {
    console.log(`Logged in as ${client.user?.tag}`);
  },
  async interactionCreate(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command | null = commands[interaction.commandName];

    if (!command) {
      console.error(`No command matching ${interaction.commandName}.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "There was a problem running this command...", ephemeral: true });
      } else {
        await interaction.reply({ content: "There was a problem running this command...", ephemeral: true });
      }
    }
  }
}

let database: SqlDatabaseService;

const envType = getEnvironmentVariable("ENVIRONMENT");

if (envType == "development") {
  database = new SqliteService("./db.sqlite");
} else {
  database = new MySqlService(getEnvironmentVariable("DB_HOST"), Number.parseInt(getEnvironmentVariable("DB_PORT")), getEnvironmentVariable("DB_USER"), getEnvironmentVariable("DB_PASSWORD"), getEnvironmentVariable("DB_DATABASE"));
}

await database.open();
await setupDatabase();

await initClient(eventHandler);