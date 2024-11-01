import { SqlDatabaseService } from "../services/sql-database-service.js";

export async function setupDatabase() {
  await SqlDatabaseService.instance.statement("CREATE TABLE IF NOT EXISTS users (id varchar(255) NOT NULL, points int NOT NULL, PRIMARY KEY (id))");
}