import { Interaction } from "discord.js";

export enum CommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11
};

export type CommandOptionChoice = {
  readonly name: string;
  readonly value: string | number;
}

export type CommandOption = {
  readonly name: string;
  readonly description: string;
  readonly type: CommandOptionType;
  readonly required: boolean;
  readonly options: CommandOption[];
}

export abstract class Command {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly options: CommandOption[];

  abstract execute(interaction: Interaction): Promise<void>;

  public toJson(): object {
    return {
      type: 1,
      name: this.name,
      description: this.description,
      options: this.optionToJson(this.options)
    };
  }

  private optionToJson(options: CommandOption[]): object[] {
    let arr: object[] = [];

    for (let opt of options) {
      arr.push({
        name: opt.name,
        description: opt.description,
        type: opt.type,
        required: opt.required,
        options: this.optionToJson(opt.options)
      });
    }

    return arr;
  }
}