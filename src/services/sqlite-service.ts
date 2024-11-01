import { SqlDatabaseService } from "./sql-database-service.js";
import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

export class SqliteService extends SqlDatabaseService {
  private _databasePath: string;
  private _database: Database | undefined;

  constructor(databasePath: string) {
    super();
    this._databasePath = databasePath;
    SqlDatabaseService.instance = this;
  }

  public async open(): Promise<void> {
    this._database = await open({
      filename: this._databasePath,
      driver: sqlite3.Database
    });
  }

  public async statement(statement: string): Promise<void> {
    await this._database?.run(statement);
  }

  public async get(statement: string): Promise<unknown> {
    const res = await this._database?.get(statement);
    return res;
  }
}