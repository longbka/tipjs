"use strict";

const Logger = require("../loggers/discord.log.v2");

const pushToLogDiscord = async (req, res, next) => {
  try {
    console.log(req.get("host"))
    Logger.sendToMessage(req.get("host"));
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { pushToLogDiscord };
