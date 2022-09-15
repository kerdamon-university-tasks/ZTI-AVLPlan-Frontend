import useAuth from 'Hooks/useAuth';
import {Navigate} from 'react-router-dom'

const Logout = () => {
  const auth = useAuth();
  auth.logout();

  return (
    <Navigate to='/' />
  )
}

export default Logout