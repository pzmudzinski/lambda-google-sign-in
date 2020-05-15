const AUTH_HEADER_NAME = "Authorization";
const AUTH_TOKEN_KEY = "authToken";

const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/dev";

export const verifyToken = async (token: string) => {
  const res = await fetch(`${baseUrl}/auth/verify`, {
    headers: { [AUTH_HEADER_NAME]: token },
  });
  return res.ok;
};

const defaultHeaders = () => {
  const authKey = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authKey) {
    return { [AUTH_HEADER_NAME]: authKey };
  }
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getSecretData = async () => {
  const res = await fetch(`${baseUrl}/data`, {
    headers: defaultHeaders(),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw Error("Failed to fetch secret data");
  }
};
