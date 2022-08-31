import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Footer from 'Components/Footer';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();
  return (
    <Stack sx={{minHeight: '100vh'}}>
      <Navbar />
      <Stack alignItems='baseline' justifyContent='center' direction='row' sx={{ flex: 1, backgroundColor: theme.palette.primary.dark }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Stack>
      <Footer />
    </Stack>
  );
}

export default App;
