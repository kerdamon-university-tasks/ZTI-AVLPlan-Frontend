import { Button, Card, Paper, Stack, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { postSpreadSheet } from "Api";
import moment, { Moment } from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewSpreadSheet = () => {
  const [dateTimeFrom, setDateTimeFrom] = useState<Moment | null>(moment().hour(8).minute(0));
  const [dateTimeTo, setDateTimeTo] = useState<Moment | null>(moment().hour(20).minute(0).add(7, 'days'));
  const [eventName, setEventName] = useState<string>('Event');

  const handleChangeFrom = (newValue: Moment | null) => {
    setDateTimeFrom(newValue);
  }
  const handleChangeTo = (newValue: Moment | null) => {
    setDateTimeTo(newValue);
  }

  const handleChangeEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  }

  const onClick = () => {
    postSpreadSheet({
      eventName,
      dateTimeFrom,
      dateTimeTo,
      avltimelineIds: []
    });
    
  }

  return (
    <div style={{margin: 40}}>
      <Stack spacing={5} alignItems='center'>
        <Stack spacing={10} alignItems='center' direction='row' justifyContent='space-around'>
          <Paper sx={{padding: 3}}>
            <Stack spacing={5} alignItems='center'>
              <Stack spacing={1}>
                <Typography>Wprowadź nazwę wydarzenia</Typography>
                <TextField variant="outlined" value={eventName} onChange={handleChangeEventName}/>
              </Stack>
              <Stack spacing={2}>
                <DesktopDatePicker
                  label="Pierwszy dzień"
                  inputFormat="DD-MM-YYYY"
                  value={dateTimeFrom}
                  onChange={handleChangeFrom}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Ostatni dzień"
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
                <Typography>Wprowadź odpowiadające Ci godziny</Typography>
              <Stack spacing={2}>
                <TimePicker
                  label="Od"
                  ampm={false}
                  value={dateTimeFrom}
                  onChange={handleChangeFrom}
                  minutesStep={60}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="Do"
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
        <Card sx={{padding: 1}}>
          <Button variant='outlined' component={Link} to={"/"} onClick={onClick}>Stwórz</Button>
        </Card>
      </Stack>
    </div>
    )
  }
  
  export default NewSpreadSheet;