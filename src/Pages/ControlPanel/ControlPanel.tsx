import { Button, Card, Paper, Stack, TextField } from "@mui/material";
import SpreadSheetList from "Components/SpreadSheetList";
import withAuth from "ContextProviders/AuthProvider/withAuth";
import { useState } from "react";

import {Link } from "react-router-dom";

const ControlPanel = () => {
  return (
    <div style={{margin: 40}}>
      <Stack spacing={2} alignItems='center'>
        <Paper sx={{padding: 1}}>
          <Button variant="contained" component={Link} to={"/new-spreadsheet"}>Create new Timeline</Button>
        </Paper>
        <SpreadSheetList/>
      </Stack>
    </div>
    )
  }
  
  export default withAuth(ControlPanel);