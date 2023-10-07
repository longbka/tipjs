"use strict";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "refreshtoken",
};
const JWT = require("jsonwebtoken");
const { asyncHandler } = require("./checkAuth");
const { AuthFailedError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "7 days",
    });
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify:: `, err);
      } else {
        console.log(`decode verify:: `, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};
const authentication = asyncHandler(async (req, res, next) => {
  /**
   * 1 - Check userId missing??
   * 2 - Get access token
   * 3 - verify Token
   * 4 - Check user in dbs
   * 5 - Check API KEY
   */
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailedError("Invalid Request");
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not Found KeyStore");
  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
      const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId)
        throw new AuthFailedError("Invalid User");
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailedError("Invalid Request");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) throw new AuthFailedError("Invalid User");
    req.keyStore = keyStore;
    req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
  }
});
const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};
module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};
