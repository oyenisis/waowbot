import { ClientEventHandler } from "./events/client-event-handler";
import { getEnvironmentVariable } from "./utils/environment";
import { Client, Events, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN_ENV_KEY: string = "DISCORD_TOKEN";

export async function initClient(eventHandler: ClientEventHandler): Promise<void> {
  const token = getEnvironmentVariable(DISCORD_TOKEN_ENV_KEY);

  const client = new Client({
    intents: [GatewayIntentBits.GuildMessages]
  });

  client.once(Events.ClientReady, eventHandler.ready);

  client.login(token);
}