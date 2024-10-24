import { User } from "../../interfaces/User";
import { AuthState } from "./AuthProvider";

type AuthAction = { type: "login"; payload: User } | { type: "logout" };

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "login":
      return { ...state, isUserLoggedIn: true, user: action.payload };
    case "logout":
      return { ...state, isUserLoggedIn: false, user: undefined };
    default:
      return state;
  }
};
