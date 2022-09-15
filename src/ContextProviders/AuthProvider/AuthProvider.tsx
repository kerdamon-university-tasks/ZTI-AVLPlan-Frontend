import React, { useState } from 'react';
import { AuthContextValues, LoggedUserData, User } from './types';

export const AuthContext = React.createContext<AuthContextValues | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>();

  const login = (loginData: LoggedUserData) => {
    const user = {
      username: loginData.username,
    }
    const token = loginData.token;
  
    setUser(user);
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('access_token');
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
