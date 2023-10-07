"use strict";

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged is as ${client.user.tag}`);
});
const token =
  "MTE1MTU1MzQ4NDQzMzQwODA2MA.GxwF3B.Hf555vDdZN6MXmdgUcp2ypLwuOFCvTB1LFJ2i8";
client.login(token);
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "hello") {
    msg.reply("Hello! How can I assists you to day");
  }
});
