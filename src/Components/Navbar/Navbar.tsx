import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import ClockIcon from '@mui/icons-material/AccessTime'
import { Link } from "react-router-dom"

const Navbar = () => {
  const publicLinks = [
    <Button color="inherit" component={Link} to="/login">Login</Button>
  ];
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        >
          <ClockIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AVL Plan
        </Typography>
        {/* {publicLinks} */}
      </Toolbar>
    </AppBar>
    );
  }
  
  export default Navbar;