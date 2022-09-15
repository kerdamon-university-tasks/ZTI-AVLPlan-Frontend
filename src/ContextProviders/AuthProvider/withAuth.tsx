import useAuth from "Hooks/useAuth";
import { Navigate } from "react-router-dom";

function withAuth<T extends object>(Component: React.ComponentType<T>): (props: T) => JSX.Element {
  return (props: T) => {
    const auth = useAuth();

    if (!auth.user) {
      return <Navigate to='/login' replace={true} />
    }

    return <Component {...props}/>
  }
}

export default withAuth;