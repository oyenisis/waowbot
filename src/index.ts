import { initClient } from "./client";
import { ClientEventHandler } from "./handlers/client-event-handler";

const eventHandler: ClientEventHandler = {
  ready(client) {
    console.log(`Logged in as ${client.user?.tag}`);
  },
}

await initClient(eventHandler);