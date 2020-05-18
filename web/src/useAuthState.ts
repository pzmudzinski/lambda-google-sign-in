import { useEffect, useState } from "react";
import { verifyToken, getAuthToken, removeAuthToken } from "./api";

export enum AuthState {
  LOADING = "loading",
  AUTHENTICATION_SUCCESS = "auth_success",
  AUTHENTICATION_FAILED = "auth_failed",
  NO_PREVIOUS_SIGN_IN = "auth_fresh",
}

export const useAuthState = (): [
  AuthState,
  React.Dispatch<React.SetStateAction<AuthState>>
] => {
  const [bootState, setBootState] = useState<AuthState>(AuthState.LOADING);

  useEffect(() => {
    const appBoot = async () => {
      const authToken = getAuthToken();
      if (!authToken) {
        setBootState(AuthState.NO_PREVIOUS_SIGN_IN);
        return;
      }
      try {
        const isValidToken = await verifyToken(authToken);
        if (isValidToken) {
          setBootState(AuthState.AUTHENTICATION_SUCCESS);
        } else {
          throw new Error("Invalid auth token");
        }
      } catch (exception) {
        setBootState(AuthState.AUTHENTICATION_FAILED);
        removeAuthToken();
      }
    };

    appBoot();
  }, []);

  return [bootState, setBootState];
};
