import { SqlDatabaseService } from "../services/sql-database-service.js";
import { calculateLevelExp } from "../utils/calc-level-xp.js";
import { Model } from "./model.js";

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
      await SqlDatabaseService.instance.statement(`INSERT INTO users VALUES (${this.id}, 0, "[]", 1, 0)`);
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

  public async addPoints(points: number): Promise<void> {
    const newPoints = (await this.getPoints()) + points;
    await this.setPoints(newPoints);
  }

  public async getWaows(): Promise<string[]> {
    await this._verifyExistence();
    const res = await SqlDatabaseService.instance.get(`SELECT waows FROM users WHERE id = ${this.id}`) as any;
    return JSON.parse(res.waows) as string[];
  }

  public async setWaows(waows: string[]): Promise<void> {
    await this._verifyExistence();
    const waowStr = JSON.stringify(waows);
    await SqlDatabaseService.instance.statement(`UPDATE users SET waows = '${waowStr}' WHERE id = ${this.id}`);
  }

  public async addWaow(waow: string): Promise<void> {
    let waows = await this.getWaows();
    waows.push(waow);
    await this.setWaows(waows);
  }

  public async getLevel(): Promise<number> {
    await this._verifyExistence();
    const res = await SqlDatabaseService.instance.get(`SELECT level FROM users WHERE id = ${this.id}`) as [string: any];
    return res["level"] as number;
  }

  public async setLevel(level: number): Promise<void> {
    await this._verifyExistence();
    await SqlDatabaseService.instance.statement(`UPDATE users SET level = ${level} WHERE id = ${this.id}`);
  }

  public async getExp(): Promise<number> {
    await this._verifyExistence();
    const res = await SqlDatabaseService.instance.get(`SELECT exp FROM users WHERE id = ${this.id}`) as [string: any];
    return res["exp"] as number;
  }

  public async setExp(exp: number): Promise<void> {
    await this._verifyExistence();
    await SqlDatabaseService.instance.statement(`UPDATE users SET exp = ${exp} WHERE id = ${this.id}`);
  }

  public async addExp(exp: number): Promise<void> {
    const level = await this.getLevel();
    let newExp = (await this.getExp()) + exp;

    const expRequirement = calculateLevelExp(level);
    if (newExp >= expRequirement) {
      await this.setLevel(level + 1);
      newExp = newExp - expRequirement;
    }

    await this.setExp(newExp);
  }
}