import { ChatInputCommandInteraction } from "discord.js";
import { Command, CommandOption, CommandOptionType } from "./command";
import { User } from "../models/user";
import { getEnvironmentVariable } from "../utils/environment";

export default class Wallet extends Command {
  name: string = "wallet";
  description: string = "Shows your point balance";
  options: CommandOption[] = [
    {
      name: "user",
      description: "The user whose account balance to check (will check yours if left blank)",
      required: false,
      type: CommandOptionType.User,
      options: []
    }
  ];

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let userId = interaction.options.getUser("user", false)?.id;
    if (userId == null) userId = interaction.user.id;

    const waow = await interaction.client.application.emojis.fetch(getEnvironmentVariable("WAOW_EMOJI"));

    const user = new User(userId);
    const points = await user.getPoints();

    await interaction.reply({ content: `<@${userId}> has ${points} ${waow} points!` })
  }
}