import { Box, Stack } from "@mui/material"
import { AVLColumn, AVLRow, columnWidth, rowHeight } from "./AvlSheetUtilities";
import { AvlSheetProps } from "./types";

const AVLAtomicTime = () => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: 'notAvailable.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)',
    }}/>
  )
}

const AVLAtomicTimeFull = () => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: 'notAvailable.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white',
    }}/>
  )
}

const AVLAtomicTimeHalf = () => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: 'notAvailable.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white', borderTopColor: 'rgba(255, 255, 255, .5)',
    }}/>
  )
}


const AVLHour = () => {
  return(
    <Stack width={columnWidth}>
      <Box>
        <AVLAtomicTimeFull/>
        <AVLAtomicTime/>
        <AVLAtomicTimeHalf/>
        <AVLAtomicTime/>
      </Box>
    </Stack>
  )
}

export const AvlTimeline = ({ numberOfHours, numberOfDays }: AvlSheetProps) => {
  return (
    <Box sx={{
      backgroundColor: 'available.main',
      borderStyle: 'none none solid solid', borderWidth: 1, borderColor: 'white',
    }}>
      <AVLRow n={numberOfDays}>
        <AVLColumn n={numberOfHours}>
          <AVLHour/>
        </AVLColumn>
      </AVLRow>
    </Box>

  )
}