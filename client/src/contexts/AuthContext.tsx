import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import api from "../api/axios";
import type {
  AuthContextType,
  LoginPayload,
  User,
} from "../types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function login(payload: LoginPayload) {
    const response = await api.post("/auth/login", payload);

    const jwt = response.data.token;

    const loggedUser = response.data.user;

    localStorage.setItem("token", jwt);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedUser)
    );

    setToken(jwt);

    setUser(loggedUser);
  }

  function logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,

      token,

      loading,

      login,

      logout,

      isAuthenticated: !!token,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}