import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as User from "./Data/user";
import * as createError from "http-errors";

const secret = process.env.SECRET;

/**
 * Gets token for valid username and pasword
 * @param {Record<string,string>} userData
 * @return {string} accessToken
 */
async function getToken(userData: { username: string; password: string }) {
  if (!secret) {
    throw "Unable to get secret";
  }
  if (!userData.username || !userData.password) {
    throw createError(400, "no enough user info to get token");
  }

  const dbUser = await User.getUser(userData.username);
  if (!dbUser) {
    throw createError(401, "wrong credentials");
  }

  const match = await bcrypt.compare(userData.password, dbUser.password);

  if (match) {
    return jwt.sign({ username: dbUser.username }, secret, { expiresIn: "1d" });
  } else {
    throw createError(401, "wrong credentials");
  }
}

/**
 * Verifies if a token is valid
 * @param {string} token
 * @return {boolean} whether the token is valid or not
 */
function verifyToken(token: string) {
  if (!secret) throw createError(500, "Unable to get secret");

  try {
    return !!jwt.verify(token, secret);
  } catch (e) {
    return false;
  }
}

/**
 * Creates a user with the specified details
 * @param {Record<string,string>} userData
 * @return {string} accessToken for the new user
 */
async function signup(userData: {
  username: string;
  password: string;
  firstname: string;
  fathername: string;
}) {
  if (!userData) {
    throw createError(400, "User data not given for signup");
  }
  userData = { ...userData };

  if (!userData.password || userData.password.length < 8) {
    throw createError(400, "Password should be greater than 8 characters");
  }

  const hash = await bcrypt.hash(userData.password, 5);
  userData.password = hash;

  if (await User.getUser(userData.username)) {
    throw createError(400, "Username already used");
  }

  await User.save(userData);

  const token = getToken(userData);

  return token;
}

/**
 * Generates accessToken for valid credentials
 * @param {Record<string,string>} userData
 * @return {string} accessToken
 */
function login(userData: { username: string; password: string }) {
  return getToken(userData);
}

export { getToken, verifyToken, signup, login };
