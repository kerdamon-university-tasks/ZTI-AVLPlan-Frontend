import { AuthContext } from "ContextProviders/AuthProvider/AuthProvider";
import { AuthContextValues } from "ContextProviders/AuthProvider/types";
import { useContext } from "react";

const useAuth = (): AuthContextValues => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('No auth context available here');
  }

  return authContext; 
}

export default useAuth;
