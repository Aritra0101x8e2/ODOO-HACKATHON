export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "DISPATCHER";

export interface User {
  id: string;

  name: string;

  email: string;

  role: UserRole;
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface AuthContextType {
  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    payload: LoginPayload
  ) => Promise<void>;

  logout: () => void;

  isAuthenticated: boolean;
}