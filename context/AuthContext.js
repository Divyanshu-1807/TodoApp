import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setToken(savedToken);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('token', 'dummy-token');
    setToken('dummy-token');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
