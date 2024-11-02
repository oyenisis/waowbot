import { User } from "../models/user.js";
import { WaowService } from "../services/waow-service.js";

export async function ensureUnlockedFreeWaows(user: User): Promise<void> {
  const allWaows = WaowService.instance.getWaows();
  let ownedWaows = await user.getWaows();
  let startWaows = [...ownedWaows];

  for (const key in allWaows) {
    if (!allWaows[key].always_unlocked) continue;

    if (!ownedWaows.includes(key)) ownedWaows.push(key);
  }

  if (ownedWaows != startWaows) {
    user.setWaows(ownedWaows);
  }
}