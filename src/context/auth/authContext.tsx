import { createContext } from "react";
import { AuthContextType } from "../../interfaces/AuthContextType";

const AuthContext = createContext<AuthContextType>({
    message: "",
    auth: false,
    login: () => { },
    errorSession:{
        error: false,
        statusCode: null
    },
    userAuthtenticate: function (): void { },
    user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
    },
    signup: function (user: any): void {},
    logout: function (): void {},
    signupStatus: null
});

export default AuthContext;
