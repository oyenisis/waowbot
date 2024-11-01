import { ClientEventHandler } from "./events/client-event-handler.js";
import { getEnvironmentVariable } from "./utils/environment.js";
import { Client, Events, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN_ENV_KEY: string = "DISCORD_TOKEN";

export async function initClient(eventHandler: ClientEventHandler): Promise<void> {
  const token = getEnvironmentVariable(DISCORD_TOKEN_ENV_KEY);

  const client = new Client({
    intents: [GatewayIntentBits.MessageContent]
  });

  client.once(Events.ClientReady, eventHandler.ready);

  client.on(Events.InteractionCreate, eventHandler.interactionCreate);

  client.login(token);
}