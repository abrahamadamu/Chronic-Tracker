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

async function checkAuth(): Promise<boolean> {
  const accessToken = readAccessToken();
  if (!accessToken) return false;

  return Axios.post(backend + "/auth/verify", { accessToken }).then(
    (response) => {
      return !!response.data.valid;
    }
  );
}

function readAccessToken() {
  return sessionStorage.getItem("akt") ?? false;
}

function writeAccessToken(accessToken?: string) {
  if (!accessToken) {
    return sessionStorage.removeItem("akt");
  }
  sessionStorage.setItem("akt", accessToken);
}

export default { readAccessToken, writeAccessToken, login, checkAuth };
