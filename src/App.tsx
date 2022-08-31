import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Stack>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
