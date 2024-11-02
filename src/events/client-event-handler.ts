import { Client, Interaction, Message } from "discord.js";

export interface ClientEventHandler {
  ready(client: Client): void;
  interactionCreate(interaction: Interaction): Promise<void>;
  messageCreate(message: Message): Promise<void>;
}