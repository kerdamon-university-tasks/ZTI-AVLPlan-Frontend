import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import ClockIcon from '@mui/icons-material/AccessTime'
import { Link } from "react-router-dom"
import useAuth from "Hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();

  const publicLinks = [
    <Button key="login" color="inherit" component={Link} to="/login">Login</Button>,
    <Button key="register" color="inherit" component={Link} to="/register">Register</Button>
  ];
  
  const authorizedLinks = [
    <Button key="logout" color="inherit" component={Link} to="/logout">Logout</Button>
  ]

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        component={Link}
        to="/"
        sx={{ mr: 2 }}
        >
          <ClockIcon />
        </IconButton>
        <Typography variant="h5" color='primary.contrastText' component={Link} to="/" sx={{ flexGrow: 1 }}>
          AVL Plan
        </Typography>
        { auth.user ? authorizedLinks : publicLinks }
      </Toolbar>
    </AppBar>
    );
  }
  
  export default Navbar;