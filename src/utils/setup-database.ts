import { SqlDatabaseService } from "../services/sql-database-service.js";

export async function setupDatabase() {
  console.log("Preparing database...");
  await SqlDatabaseService.instance.statement("CREATE TABLE IF NOT EXISTS users (id varchar(255) NOT NULL, points int NOT NULL DEFAULT 0, waows TEXT NOT NULL DEFAULT '[]', level int NOT NULL DEFAULT 1, exp int NOT NULL DEFAULT 0, PRIMARY KEY (id))");
  console.log("Prepared database!");
}