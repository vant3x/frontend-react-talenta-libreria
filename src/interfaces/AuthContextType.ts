import { User } from "./User.interface";

export interface AuthContextType {
    message: string;
    auth: boolean;
    login: (user: any) => void;
    signup: (user: User) => void;
    userAuthtenticate: () => void;
    logout: () => void;
    errorSession: {
        error: boolean;
        statusCode: number | null;
    };
    token?: string;
    signupStatus: number | null;
    user: {
        name?: string;
        lastname?: string;
        email: string;
        password: string;
    }
}