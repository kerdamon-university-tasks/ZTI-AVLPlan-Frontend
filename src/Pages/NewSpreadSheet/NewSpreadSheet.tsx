import { Button, Card, Paper, Stack, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { postSpreadSheet } from "Api";
import withAuth from "ContextProviders/AuthProvider/withAuth";
import moment, { Moment } from "moment";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewSpreadSheet = () => {
  const [dateTimeFrom, setDateTimeFrom] = useState<Moment | null>(moment().hour(8).minute(0));
  const [dateTimeTo, setDateTimeTo] = useState<Moment | null>(moment().hour(20).minute(0).add(7, 'days'));
  const [eventName, setEventName] = useState<string>('Name of event');
  let navigate = useNavigate();

  const handleChangeFrom = (newValue: Moment | null) => {
    setDateTimeFrom(newValue);
  }
  const handleChangeTo = (newValue: Moment | null) => {
    setDateTimeTo(newValue);
  }

  const handleChangeEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  }

  const onClick = async () => {
    const createdSpreadsheetId = await postSpreadSheet({
      eventName,
      dateTimeFrom,
      dateTimeTo,
      avltimelineIds: []
    });
    navigate(`/spreadsheet/${createdSpreadsheetId}`);
  }

  return (
    <div style={{ margin: 40 }}>
      <Paper sx={{ padding: 5 }}>
        <Stack spacing={5} alignItems='center'>
          <Stack spacing={10} alignItems='center' direction='row' justifyContent='space-around'>
            <Paper sx={{padding: 3}}>
              <Stack spacing={5} alignItems='center'>
                <Stack spacing={2}>
                  <Typography variant='h4' gutterBottom>Choose days</Typography>
                  <DesktopDatePicker
                    label="First day"
                    inputFormat="DD-MM-YYYY"
                    value={dateTimeFrom}
                    onChange={handleChangeFrom}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="Last day"
                    inputFormat="DD-MM-YYYY"
                    value={dateTimeTo}
                    onChange={handleChangeTo}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </Stack>
            </Paper>
            <Paper sx={{padding: 3}}>
              <Stack spacing={5} alignItems='center'>
                  <Typography variant='h4' gutterBottom>Choose hours</Typography>
                <Stack spacing={2}>
                  <TimePicker
                    label="From"
                    ampm={false}
                    value={dateTimeFrom}
                    onChange={handleChangeFrom}
                    minutesStep={60}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TimePicker
                    label="To"
                    ampm={false}
                    value={dateTimeTo}
                    onChange={handleChangeTo}
                    minutesStep={60}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Paper sx={{padding: 1}}>
            <Stack spacing={1}>
              <Typography variant='h4' gutterBottom>Choose name</Typography>
              <TextField variant="outlined" value={eventName} onChange={handleChangeEventName}/>
            </Stack>
          </Paper>
          <Button variant='contained' component={Link} to={"/"} onClick={onClick}>Create</Button>
        </Stack>
      </Paper>
    </div>
    )
  }
  
  export default withAuth(NewSpreadSheet);