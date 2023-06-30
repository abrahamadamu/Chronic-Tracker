import { backend } from "Config/data";
import Axios from "axios";

async function login(creds: {
  username: string;
  password: string;
}): Promise<boolean> {
  return Axios.post(backend + "/auth/login", creds).then((response) => {
    if (response.data.accessToken) {
      writeAccessToken(response.data.accessToken);
      return true;
    }
    return false;
  });
}

function readAccessToken() {
  return localStorage.getItem("akt") ?? false;
}

function writeAccessToken(accessToken: string) {
  localStorage.setItem("akt", accessToken);
}

(window as any).login = login;
(window as any).readAccessToken = readAccessToken;

export default { readAccessToken, writeAccessToken, login };
