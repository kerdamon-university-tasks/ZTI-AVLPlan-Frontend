import { Button, Card, Paper, Stack, TextField, Typography } from "@mui/material";
import useAuth from "Hooks/useAuth";
import { useState } from "react";

import {Link, Navigate } from "react-router-dom";

const Home = () => {

  const auth = useAuth();

  if (auth.user) {
    return <Navigate to='/control-panel' />
  }

  return (
    <div style={{margin: 40}}>
      <Paper color='primary.main'>
        <Stack alignItems='center' padding={2}>
          <Typography variant='h1'>Welcome!</Typography>
          <Typography variant='h2'>Please log in to proceed</Typography>
        </Stack>
      </Paper>
    </div>
    )
  }
  
  export default Home;