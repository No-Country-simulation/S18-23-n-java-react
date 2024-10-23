import { createContext } from "react";
import { User } from "../../interfaces/User";

interface AuthContextProps {
    isUserLoggedIn: boolean,
    user?: User
    userLogin: (user : User) => void
    userLogout: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)