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
          <Button color="secondary" variant="outlined" component={Link} to={"/timeline/" + id}>Go do timeline</Button>
        </Stack>
      </Card>
      <Card sx={{padding: 5}}>
        <Button variant="outlined" component={Link} to={"/new-spreadsheet"}>Create new Timeline</Button>
      </Card>
    </div>
    )
  }
  
  export default Home;