import { ChatInputCommandInteraction, InteractionResponse } from "discord.js";
import { Command, CommandOption, CommandOptionType } from "./command.js";
import { WaowService } from "../services/waow-service.js";

export default class Preview extends Command {
  name: string = "preview";
  description: string = "Previews a waow";
  options: CommandOption[] = [
    {
      name: "waow",
      description: "The name of the waow to preview",
      required: true,
      type: CommandOptionType.String,
      options: []
    }
  ];

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const waowKey = interaction.options.getString("waow", true);

    const waow = WaowService.instance.getWaow(waowKey);

    if (waow == null) {
      await interaction.reply({ content: `Waow '${waowKey}' does not exist.`, ephemeral: true });
      return;
    }

    await interaction.reply({ files: [waow.img], ephemeral: true });
  }
}