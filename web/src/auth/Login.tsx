import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { verifyToken, saveAuthToken } from "../api";

export const Login = () => {
  const [error, setError] = useState<string>();
  const history = useHistory();

  const signIn = useCallback(
    async ({ tokenId }) => {
      try {
        const isValidToken = await verifyToken(tokenId);
        if (!isValidToken) {
          setError("Invalid token.");
          return;
        }
        saveAuthToken(tokenId);
        history.replace("/");
      } catch (exception) {
        setError("Something went wrong while logging in.");
      }
    },
    [history]
  );

  return (
    <main>
      <h1>Sign In to our realm</h1>
      <GoogleLogin
        onAutoLoadFinished={console.log}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
        buttonText="Login"
        onSuccess={signIn}
        onFailure={console.error}
        cookiePolicy={"single_host_origin"}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
};
