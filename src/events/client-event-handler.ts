import { Client, Interaction } from "discord.js";

export interface ClientEventHandler {
  ready(client: Client): void;
  interactionCreate(interaction: Interaction): Promise<void>;
}