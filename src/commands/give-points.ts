import { ChatInputCommandInteraction } from "discord.js";
import { Command, CommandOption, CommandOptionType } from "./command";
import { User } from "../models/user";
import { getEnvironmentVariable } from "../utils/environment";

export default class GivePoints extends Command {
  name: string = "givepoints";
  description: string = "Give someone waow points";
  options: CommandOption[] = [
    {
      name: "user",
      description: "The user to give points to",
      required: true,
      type: CommandOptionType.User,
      options: []
    },
    {
      name: "amount",
      description: "The amount of points to give",
      required: true,
      type: CommandOptionType.Integer,
      options: []
    }
  ];

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (interaction.user.id != "1301416578985885777") {
      await interaction.reply({ content: "You are not authorised to use this command.", ephemeral: true });
      return;
    }

    let userId = interaction.options.getUser("user", true).id;
    let points = interaction.options.getInteger("amount", true);

    const waow = await interaction.client.application.emojis.fetch(getEnvironmentVariable("WAOW_EMOJI"));

    const user = new User(userId);
    const currentPoints = await user.getPoints();

    await user.setPoints(currentPoints + points);

    await interaction.reply({ content: `<@${userId}> has received ${points} ${waow} points! Their new balance is ${points + currentPoints} ${waow} points!` })
  }
}