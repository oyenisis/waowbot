import { SqlDatabaseService } from "../services/sql-database-service";
import { Model } from "./model";

export class User extends Model {
  public id: string;
  private _exists: boolean = false;

  constructor(id: string) {
    super("users");
    this.id = id;
  }

  private async _verifyExistence(): Promise<void> {
    if (this._exists) return;
    if (await SqlDatabaseService.instance.get(`SELECT id FROM users WHERE id = ${this.id}`) == undefined) {
      await SqlDatabaseService.instance.statement(`INSERT INTO users VALUES (${this.id}, 0)`);
      this._exists = true;
    }
  }

  public async getPoints(): Promise<number> {
    await this._verifyExistence();
    const res = await SqlDatabaseService.instance.get(`SELECT points FROM users WHERE id = ${this.id}`) as [string: any];
    return res["points"] as number;
  }

  public async setPoints(points: number): Promise<void> {
    await this._verifyExistence();
    await SqlDatabaseService.instance.statement(`UPDATE users SET points = ${points} WHERE id = ${this.id}`);
  }
}