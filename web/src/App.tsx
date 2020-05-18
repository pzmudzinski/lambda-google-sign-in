import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
  useHistory,
} from "react-router-dom";
import { Login } from "./auth/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { useAuthState, AuthState } from "./useAuthState";
import "./App.css";

type AuthRouteProps = {
  authPredicate: () => boolean;
  redirectPath: string;
  children: React.ReactNode;
};

const AuthenticatedRoute = ({
  authPredicate,
  redirectPath,
  children,
  ...rest
}: AuthRouteProps & RouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authPredicate() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

function App() {
  const history = useHistory();
  const [authState, setAuthState] = useAuthState();
  const isAuthenticated = useCallback(() => {
    return authState === AuthState.AUTHENTICATION_SUCCESS;
  }, [authState]);

  const isUnauthenticated = useCallback(() => {
    return [
      AuthState.AUTHENTICATION_FAILED,
      AuthState.NO_PREVIOUS_SIGN_IN,
    ].includes(authState);
  }, [authState]);

  const onLoginSuccess = useCallback(() => {
    setAuthState(AuthState.AUTHENTICATION_SUCCESS);
    history.replace("/");
  }, [history, setAuthState]);

  return (
    <div className="App">
      <Router>
        {authState === AuthState.LOADING && <h1>Loading...</h1>}
        {authState !== AuthState.LOADING && (
          <Switch>
            <AuthenticatedRoute
              authPredicate={isUnauthenticated}
              path="/login"
              redirectPath="/"
            >
              <Login onSuccess={onLoginSuccess} />
            </AuthenticatedRoute>

            <AuthenticatedRoute
              authPredicate={isAuthenticated}
              redirectPath="/login"
            >
              <Dashboard />
            </AuthenticatedRoute>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
