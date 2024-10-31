import { initClient } from "./client";
import { ClientEventHandler } from "./events/client-event-handler";
import { User } from "./models/user";
import { SqlDatabaseService } from "./services/sql-database-service";
import { SqliteService } from "./services/sqlite-service";
import { getEnvironmentVariable } from "./utils/environment";
import { setupDatabase } from "./utils/setup-database";

const eventHandler: ClientEventHandler = {
  ready(client) {
    console.log(`Logged in as ${client.user?.tag}`);
  },
}

let database: SqlDatabaseService;

const envType = getEnvironmentVariable("ENVIRONMENT");

if (envType == "development") {
  database = new SqliteService("./db.sqlite");
  await database.open();
} else {
  database = new SqliteService(":memory:");
}

await setupDatabase();

console.log(await new User("532297642559012884").getPoints());

await initClient(eventHandler);