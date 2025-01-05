import { createContext,useContext,useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
    const [user, setUser] = useState(() => {
        // Get user from local storage or fallback to null
        return JSON.parse(localStorage.getItem("user")) || null;
      });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
