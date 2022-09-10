import { Box, Stack, Typography } from "@mui/material";
import { AvlSheetProps } from "./types";
import { AvlTimeline } from './AvlTimeline';
import { columnWidth, modifyAvailabilityTypeArray, rowHeight } from "./AvlSheetUtilities";
import { AvlSpan } from "Api/types";

const HourColumnElement = ({hourFrom, offset}: {hourFrom: number, offset: number}) => {
  return(
    <Stack height={rowHeight} justifyContent='center' alignItems='center'>
      <Typography sx={{color: 'primary.contrastText'}}>{hourFrom+offset}:00</Typography>
    </Stack>
  )
}

const HourColumn = ({hourFrom, numberOfHours}: {hourFrom: number, numberOfHours: number}) => {
  const elements = Array.from({length: numberOfHours + 1}, (_, index) => {
    return <HourColumnElement key={index} hourFrom={hourFrom} offset={index} />;
  });
  return(
    <Stack>
      {elements}
    </Stack>
  )
}

const DayRowElement = ({dayFrom, offset}: {dayFrom: number, offset: number}) => {
  return(
    <Stack width={columnWidth} justifyContent='center' alignItems='center' sx={{backgroundColor: 'primary.light', borderStyle: 'solid', borderColor: 'primary.contrastText', borderWidth: 1}}>
      <Typography sx={{color: 'primary.contrastText'}}>{dayFrom+offset}</Typography>
    </Stack>
  )
}

const DayRow = ({dayFrom, numberOfDays}: {dayFrom: number, numberOfDays: number}) => {
  const elements = Array.from({length: numberOfDays}, (_, index) => {
    return <DayRowElement key={index} dayFrom={dayFrom} offset={index} />;
  });
  return(
    <Stack direction='row'>
      {elements}
    </Stack>
  )
}

const AvlSheet = ({ hourFrom, hourTo, dateFrom, dateTo, avlSpans }: AvlSheetProps) => {
  
  const numberOfHours = hourTo - hourFrom;
  const numberOfDays = dateTo - dateFrom;

  return (
    <Stack direction='row' spacing={1.5} justifyContent='center' alignItems='flex-end'>
      <HourColumn hourFrom={hourFrom} numberOfHours={numberOfHours}/>
      <Stack>
        <Box mb={1}>
          <DayRow dayFrom={dateFrom} numberOfDays={numberOfDays}/>
        </Box>
          <AvlTimeline numberOfHours={numberOfHours} numberOfDays={numberOfDays} avlSpans={avlSpans} hourFrom={hourFrom}/>
          <Box height={rowHeight/2}/> {/* compensation to align with hours properly */}
      </Stack>
    </Stack>
    );
  }
  
  export default AvlSheet;