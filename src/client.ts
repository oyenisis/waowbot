import { ClientEventHandler } from "./events/client-event-handler.js";
import { getEnvironmentVariable } from "./utils/environment.js";
import { Client, Events, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN_ENV_KEY: string = "DISCORD_TOKEN";

export async function initClient(eventHandler: ClientEventHandler): Promise<void> {
  console.log("Starting client...");

  const token = getEnvironmentVariable(DISCORD_TOKEN_ENV_KEY);

  const client = new Client({
    intents: [
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages
    ]
  });

  client.once(Events.ClientReady, eventHandler.ready);
  client.on(Events.InteractionCreate, eventHandler.interactionCreate);
  client.on(Events.MessageCreate, eventHandler.messageCreate);

  client.login(token);
}