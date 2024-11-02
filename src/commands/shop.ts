import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, InteractionResponse } from "discord.js";
import { Command, CommandOption, CommandOptionType } from "./command.js";
import { WaowService } from "../services/waow-service.js";
import { User } from "../models/user.js";
import { getEnvironmentVariable } from "../utils/environment.js";
import { ensureUnlockedFreeWaows } from "../utils/unlock-free-waows.js";

export default class Shop extends Command {
  name: string = "shop";
  description: string = "Shows the waow shop";
  options: CommandOption[] = [
    {
      name: "page",
      description: "The shop page (defaults to 1)",
      required: false,
      type: CommandOptionType.Integer,
      options: []
    }
  ];

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let page = interaction.options.getInteger("page", false);
    if (page == null) page = 0;
    else page = page - 1;
    
    const waowEmoji = await interaction.client.application.emojis.fetch(getEnvironmentVariable("WAOW_EMOJI"));
    
    if (page < 0) {
      await interaction.reply({ content: `Page number must be one or higher ${waowEmoji}`, ephemeral: true });
      return;
    }

    const user = new User(interaction.user.id);
    await ensureUnlockedFreeWaows(user);
    const ownedWaows = await user.getWaows();

    let message = `Shop - Page ${page + 1}`;
    
    const waows = Object.values(WaowService.instance.getWaows());
    const startIndex = 10 * page;

    if (waows[startIndex] == null) {
      await interaction.reply({ content: `Page ${page + 1} does not exist ${waowEmoji}`, ephemeral: true });
      return;
    }

    for (let i = startIndex; i < startIndex + 10; i++) {
      if (waows[i] == null) break;

      message += `\n${waows[i].display_name} [${waows[i].name}] - ${waows[i].price} ${waowEmoji} points`;

      if (ownedWaows.includes(waows[i].name)) {
        message += " (owned)";
      }
    }

    await interaction.reply({ content: message });
  }
}