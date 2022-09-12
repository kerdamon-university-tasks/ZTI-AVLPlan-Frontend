import { Box, Stack, Typography } from "@mui/material";
import { columnWidth, rowHeight } from "Components/AvlTimelines/AvlSheetUtilities";
import useTimelineDataContext from "Hooks/useTimelineDataContext";

const AvlSheet = ({children}: {children: React.ReactNode}) => {
  const timelineDataContext = useTimelineDataContext();

  const numberOfHours = timelineDataContext.getNumberOfHours();
  const numberOfDays = timelineDataContext.getNumberOfDays();
  const timelineData = timelineDataContext.getTimelineData();

  return (
    <Stack direction='row' spacing={1.5} justifyContent='center' alignItems='flex-end'>
      <HourColumn hourFrom={timelineData.dateTimeFrom.getHours()} numberOfHours={numberOfHours}/>
      <Stack>
        <Box mb={1}>
          <DayRow dayFrom={timelineData.dateTimeFrom.getDate()} numberOfDays={numberOfDays}/>
        </Box>
          <Stack direction='row'>
            {children}
          </Stack>
          <Box height={rowHeight/2}/> {/* compensation to align with hours properly */}
      </Stack>
    </Stack>
    );
  }

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
  
  export default AvlSheet;