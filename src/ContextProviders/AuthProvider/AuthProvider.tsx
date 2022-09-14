import React, { useState } from 'react';
import { AuthContextValues, LoginData, User } from './types';

export const AuthContext = React.createContext<AuthContextValues | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>();

  const login = (loginData: LoginData) => {
    const user = {
      username: loginData.username,
    }
    const token = loginData.token;
  
    setUser(user);
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('accessToken');
  }

  const values = {
    user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
