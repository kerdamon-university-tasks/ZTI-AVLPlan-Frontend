import { Button, Card, Paper, Stack, TextField } from "@mui/material";
import withAuth from "ContextProviders/AuthProvider/withAuth";
import { useState } from "react";

import {Link } from "react-router-dom";

const ControlPanel = () => {
  const [id, setId] = useState("");

  const handleChange = (e:any) => {
    setId(e.target.value);
  }

  return (
    <div style={{margin: 40}}>
      <Stack spacing={2}>
        <Paper sx={{padding: 1}}>
          <Button variant="contained" component={Link} to={"/new-spreadsheet"}>Create new Timeline</Button>
        </Paper>
      </Stack>
    </div>
    )
  }
  
  export default withAuth(ControlPanel);