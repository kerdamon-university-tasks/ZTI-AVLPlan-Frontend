import { Button, Card, Stack, TextField } from "@mui/material";
import { useState } from "react";

import {Link } from "react-router-dom";

const Home = () => {
  const [id, setId] = useState("");

  const handleChange = (e:any) => {
    setId(e.target.value);
  }

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5}}>
        <Stack spacing={2}>
          <TextField label="Timeline id" variant="outlined" onChange={handleChange} color='secondary'/>
          <Button variant="outlined" component={Link} to={"/spreadsheet/" + id}>Go do timeline</Button>
          <Button variant="outlined" component={Link} to={"/new-spreadsheet"}>Create new Timeline</Button>
        </Stack>
      </Card>
    </div>
    )
  }
  
  export default Home;