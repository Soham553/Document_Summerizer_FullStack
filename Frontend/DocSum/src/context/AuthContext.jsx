import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const register = async (email, username, passowrd) => {
    const res = await fetch("http://localhost:8000/api/v1/user/register", {
        method: "POSt",
        body: JSON.stringify({email, username, passowrd}),
        headers: {"content-Type": "appliction/json"}
    });

    if(res.ok) {
        const data = await res.json();
        setUser(data.user);
    } 
 }

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
