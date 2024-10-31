export abstract class Model {
  private _table: string;

  constructor(table: string) {
    this._table = table;
  }
}