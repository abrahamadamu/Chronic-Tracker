import { User } from "../../models/User";

function getUser(username: string) {
  return User.findOne({
    username: ("" + username).toLowerCase().trim(),
  });
}

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
