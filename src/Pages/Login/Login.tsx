import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import useAuth from 'Hooks/useAuth';
import {Link, Navigate} from 'react-router-dom'
import { login } from 'Api';

const defaultValues = {
  username: '',
  password: '',
}; 
 
type LoginFormValues = typeof defaultValues;

const Login = () => {
  const auth = useAuth();
  const {handleSubmit, setError, register, formState: {errors}} = useForm({defaultValues});
  if(auth.user) return <Navigate to='/' />

  const fields = {
    email: register('username', {required: true, minLength: 3}),
    password: register('password', {required: true, minLength: {value: 3, message: "Password too short"}}),
  }

  const onSubmit = async (formValues: LoginFormValues) => {
    try{
      const token = await login({username: formValues.username, password: formValues.password})
      auth.login({username: formValues.username, token});
    } catch(error) {
      let message;
      if (error instanceof Error) message = error.message;
      setError('username', { type: 'custom', message });
    }
  };

  return (
    <Stack justifyContent="center" alignItems='center' flex={1} flexDirection="column">
      <Paper sx={{padding: '20px', marginTop: '100px', width: '400px'}} elevation={5}>
        <Stack spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h4' gutterBottom>Login</Typography>
          <TextField label="Username" variant="outlined" inputProps={{...fields.email}} />
          <TextField label="Password" type="password" variant="outlined" inputProps={{...fields.password}} />
          {errors.password && <Typography>{errors.password.message}</Typography>}
          {errors.username && <Typography color="error.main">{errors.username.message}</Typography>}
          <Button type='submit' variant='contained'>Login</Button>
          <Button component={Link} to="/register">Don't have account? Register</Button>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Login