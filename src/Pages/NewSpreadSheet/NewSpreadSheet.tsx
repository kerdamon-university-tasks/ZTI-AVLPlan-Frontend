import { Button, Card, Paper, Stack, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { postTimeline } from "Api";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import moment, { Moment } from "moment";
import { useState } from "react";

const NewSpreadSheet = () => {
  
  const [dateTimeFrom, setDateTimeFrom] = useState<Moment | null>(moment());
  const [dateTimeTo, setDateTimeTo] = useState<Moment | null>(moment());

  const handleChangeFrom = (newValue: Moment | null) => {
    setDateTimeFrom(newValue);
  }

  const handleChangeTo = (newValue: Moment | null) => {
    setDateTimeTo(newValue);
  }

  // const timelineDataContext = useTimelineDataContext();
  // let dateTimeFrom = timelineDataContext.getTimelineData().dateTimeFrom;
  // let dateTimeTo = timelineDataContext.getTimelineData().dateTimeTo;
  // dateTimeFrom.setDate(5);
  // dateTimeFrom.setHours(5);
  // dateTimeTo.setDate(13);
  // dateTimeTo.setHours(13);
  
  // timelineDataContext.setDateTimeFrom(dateTimeFrom);
  // timelineDataContext.setDateTimeTo(dateTimeTo);

  // const handleOnClick = () => {
  //   console.log(`wysylam na backend`);
  //   console.log(timelineDataContext.getTimelineData());
  //   postTimeline(timelineDataContext.getTimelineData());
  // }

  return (
    <div style={{margin: 40}}>
      <Stack spacing={5} alignItems='center'>
        <Stack spacing={10} alignItems='center' direction='row' justifyContent='space-around'>
          <Paper sx={{padding: 3}}>
            <Stack spacing={5} alignItems='center'>
              <Stack spacing={1}>
                <Typography>Wprowadź nazwę wydarzenia</Typography>
                <TextField variant="outlined"/>
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
          <Button variant='outlined'>Stwórz</Button>
        </Card>
      </Stack>
    </div>
    )
  }
  
  export default NewSpreadSheet;