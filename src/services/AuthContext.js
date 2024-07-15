// AuthContext.js
import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Load the initial state from localStorage
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [user, setUser] = useState(() => {
    // Load the initial state from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null)
    localStorage.removeItem("authToken")
  };


  useEffect(() => {
    // Update localStorage whenever user state changes and login in info
    if (user && isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [user, isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
