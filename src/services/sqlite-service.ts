import { SqlDatabaseService } from "./sql-database-service";
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

  public async close(): Promise<void> {
    await this._database?.close();
  }

  public async statement(statement: string, ...params: unknown[]): Promise<void> {
    await this._database?.run(statement, params);
  }

  public async get(statement: string, ...params: unknown[]): Promise<unknown> {
    const res = await this._database?.get(statement, params);

    return res;
  }
}