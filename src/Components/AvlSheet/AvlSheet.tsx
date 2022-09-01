import Grid from '@mui/material/Unstable_Grid2'
import { Box, Stack, Typography } from "@mui/material";
import { AvlSheetProps } from "./types";
import { AvlTimeline } from './AvlTimeline';
import { AVLColumn, AVLRow, columnWidth, rowHeight } from "./AvlSheetUtilities";

const HourColumn = () => {
  return(
    <Stack height={rowHeight} justifyContent='center' alignItems='center'>
      <Typography sx={{color: 'primary.contrastText'}}>16:00</Typography>
    </Stack>
  )
}

const DayRow = () => {
  return(
    <Stack width={columnWidth} justifyContent='center' alignItems='center' sx={{backgroundColor: 'primary.light', borderStyle: 'solid', borderColor: 'primary.contrastText', borderWidth: 1}}>
      <Typography sx={{color: 'primary.contrastText'}}>16:00</Typography>
    </Stack>
  )
}

const AvlSheet = ({ numberOfHours, numberOfDays }: AvlSheetProps) => {
  return (
    <Stack direction='row' spacing={1.5} justifyContent='center' alignItems='flex-end'>
      <AVLColumn n={numberOfHours + 1}>
        <HourColumn/>
      </AVLColumn>
      <Stack>
        <Box mb={1}>
          <AVLRow n={numberOfDays}>
            <DayRow/>
          </AVLRow>
        </Box>
          <AvlTimeline numberOfHours={numberOfHours} numberOfDays={numberOfDays}/>
          <Box height={rowHeight/2}/> {/* compensation to align with hours properly */}
      </Stack>
    </Stack>
    );
  }
  
  export default AvlSheet;