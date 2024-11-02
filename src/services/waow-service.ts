import * as fs from "fs";

export type Waow = {
  name: string,
  display_name: string,
  price: number,
  always_unlocked: boolean,
  img: string
}

export class WaowService {
  static #instance: WaowService;

  private static readonly _waowAssetPath = "./assets/waow/";

  private static _waows: { [key: string]: Waow } = {};

  private constructor() {}

  public static get instance(): WaowService {
    if (!WaowService.#instance) {
      WaowService.#instance = new WaowService();
    }

    return WaowService.#instance;
  }

  public async init() {
    await this._refreshCollection();
    setInterval(this._refreshCollection, 1000 * 60 * 10);
  }

  public getWaow(key: string): Waow {
    return WaowService._waows[key];
  }

  public getWaows() {
    return WaowService._waows;
  }

  private async _refreshCollection() {
    console.log("Refreshing Waows");

    let waows: Waow[] = [];

    const waowAssets = fs.readdirSync(WaowService._waowAssetPath);

    for (const asset of waowAssets) {
      const waow: Waow = JSON.parse(fs.readFileSync(WaowService._waowAssetPath + asset).toString()) as Waow;
      waows.push(waow);
    }

    waows.sort((a, b) => a.price - b.price);

    let waowDict: { [key: string]: Waow } = {};

    waows.forEach(function(v) {
      waowDict[v.name] = v;
    });

    WaowService._waows = waowDict;

    console.log(`Finished refreshing ${Object.keys(waows).length} waows!`);
  }
}