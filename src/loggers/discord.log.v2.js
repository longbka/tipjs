"use strict";
require('dotenv').config()
const { Client, GatewayIntentBits } = require("discord.js");
const { CHANNEL_ID_DISCORD, TOKEN_DISCORD } = process.env;
class LoggerService {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.channelId = "1151556125825708035";

    this.client.on("ready", () => {
      console.log(`Logged is as ${this.client.user.tag}`);
    });
    this.client.login("MTE1MTU1MzQ4NDQzMzQwODA2MA.GoqhdJ.xnTCd0AvJvEuAMS1i3zV73tAxbLSCOBgMHiHQM");
  }
  sendToMessage(message = "message") {
    const channel = this.client.channels.cache.get(this.channelId);
    if (!channel) {
      console.error(`Couldn't find the channel...`, this.channelId);
      return;
    }
    channel.send(message).catch((e) => console.log(e));
  }
}
// const loggerService = new LoggerService();
module.exports = new LoggerService();
