import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../interfaces/User";
import { AuthReducer } from "./authReducer";
import {
  deleteCookie,
  setCookie,
  getCookie,
} from "../../service/cookies/cookiesService";

export interface AuthState {
  isUserLoggedIn: boolean;
  user?: User;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

let INITIAL_VALUE = {
  isUserLoggedIn: false,
  user: undefined,
};

if (getCookie("user")) {
  INITIAL_VALUE = {
    isUserLoggedIn: true,
    user: getCookie("user"),
  };
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_VALUE);

  const userLogin = (user: User) => {
    dispatch({ type: "login", payload: user });
    setCookie("user", JSON.stringify(user), 1);
  };

  const userLogout = () => {
    dispatch({ type: "logout" });
    deleteCookie("user");
  };

  return (
    <AuthContext.Provider value={{ ...state, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
