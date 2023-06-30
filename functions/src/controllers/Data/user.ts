import { User } from "../../models/User";

/**
 * gets user data by username
 * @param {string} username
 * @return {Record<string,string>} user data
 */
function getUser(username: string) {
  return User.findOne({
    username: ("" + username).toLowerCase().trim(),
  });
}

/**
 * saves user to database
 * @param {Record<string,string>} userData
 * @return {boolean} success of the operation
 */
async function save(userData: {
  username: string;
  password: string;
  firstname: string;
  fathername: string;
}) {
  const existing = await getUser(userData.username);
  if (existing) {
    await User.updateOne(
      { username: ("" + existing.username).toLowerCase().trim() },
      userData
    );
  } else {
    await User.create(userData);
  }
  return true;
}

export { getUser, save };
