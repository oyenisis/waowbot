import { Client } from "discord.js";

export interface ClientEventHandler {
  ready(client: Client): void;
}