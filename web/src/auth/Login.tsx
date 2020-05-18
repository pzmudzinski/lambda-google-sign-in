import React, { useCallback, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { verifyToken, saveAuthToken } from "../api";

type LoginProps = {
  onSuccess: () => void;
};

export const Login = ({ onSuccess }: LoginProps) => {
  const [error, setError] = useState<string>();
  const signIn = useCallback(
    async ({ tokenId }) => {
      try {
        const isValidToken = await verifyToken(tokenId);
        if (!isValidToken) {
          setError("Invalid token.");
          return;
        }
        saveAuthToken(tokenId);
        onSuccess();
      } catch (exception) {
        setError("Something went wrong while logging in.");
      }
    },
    [onSuccess]
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
