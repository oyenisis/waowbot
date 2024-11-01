import { SqlDatabaseService } from "./sql-database-service";
import Db from "mysql2-async";

export class MySqlService extends SqlDatabaseService {
  private _host: string;
  private _port: number;
  private _user: string;
  private _password: string;
  private _databaseName: string;

  private _database: Db | undefined;

  constructor(host: string, port: number, user: string, password: string, database: string) {
    super();

    this._host = host;
    this._port = port;
    this._user = user;
    this._password = password;
    this._databaseName = database;

    SqlDatabaseService.instance = this;
  }

  public async open(): Promise<void> {
    this._database = new Db({
      host: this._host,
      port: this._port,
      user: this._user,
      password: this._password,
      database: this._databaseName,
      dateStrings: true,
      skiptzfix: true
    });
  }

  public async statement(statement: string): Promise<void> {
    await this._database?.query(statement);
  }

  public async get(statement: string): Promise<unknown> {
    const res = await this._database?.getrow(statement);
    return res;
  }
}