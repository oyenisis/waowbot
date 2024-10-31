import { SqlDatabaseService } from "../services/sql-database-service";
import { Model } from "./model";

export class User extends Model {
  private _id: string;
  private _exists: boolean = false;

  constructor(id: string) {
    super("users");
    this._id = id;
  }

  private async _verifyExistence(): Promise<void> {
    if (this._exists) return;
    if (await SqlDatabaseService.instance.get("SELECT id FROM users WHERE id = ?", this._id) == undefined) {
      await SqlDatabaseService.instance.statement("INSERT INTO users VALUES (?, 0)", this._id);
      this._exists = true;
    }
  }

  public async getPoints(): Promise<number> {
    await this._verifyExistence();
    return (await SqlDatabaseService.instance.get("SELECT points FROM users WHERE id = ?", this._id) as number);
  }
}