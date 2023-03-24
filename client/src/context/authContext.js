import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    //TO DO
    const res = await axios.post("http://localhost:8080/api/auth/login",inputs,{
      withCredentials: true
    });
    // localStorage.setItem("user", JSON.stringify(currentUser));
    console.log("Click login");
    console.log('currentUser'+ currentUser);
    setCurrentUser(res.data);
  };

  //useEffect chay cuoi cung, sau tat ca lan re-render
  // xem currentUser la thang nao de gan vao localStorage
  useEffect(() => {
    console.log("UseEffect run");
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // console.log(currentUser);
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {/* -> App.js */}
      {console.log('re-render')}
       {children}  
    </AuthContext.Provider>
  );
};
