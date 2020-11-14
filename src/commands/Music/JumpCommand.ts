import type { Message } from "discord.js";
import Command from "../../structures/Command";
import { CommandConf } from "../../decorators";

@CommandConf({
    name: "jump",
    aliases: ["skipto"],
    description: "Jump to a specific song in the queue",
    usage: "jump <song number>",
    ownerOnly: false
})
export default class JumpCommand extends Command {
    public async exec(msg: Message, args: string[]): Promise<Message | void> {
        const voiceChannel = msg.member?.voice.channel;
        const numb = parseInt(args[0]);
        
        if (!msg.guild?.music.current) return;
        if (!voiceChannel) return msg.channel.send("You need to join voice channel first");
        if (msg.guild?.music.current && voiceChannel.id !== msg.guild?.music.channel.voice?.id) {
            return msg.channel.send(`I'am sorry, you need to be in **${
                msg.guild?.music.channel.voice!.name}** voice channel`);
        }

        if (!Number(numb)) return;
        if (numb >= msg.guild.music.queue.length + 1) {
            return msg.channel.send("You provide an invalid song number, check your queue first");
        }
        msg.guild?.music.queue.splice(0, numb - 1);
        return msg.guild?.music.skip();
    }
}
