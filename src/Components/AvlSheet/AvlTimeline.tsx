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
      borderStyle: 'dashed', borderWidth: 1, borderColor: 'white'
    }}/>
  )
}

const AVLHour = () => {
  return(
    <Stack width={columnWidth}>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
    </Stack>
  )
}

export const AvlTimeline = ({ numberOfHours, numberOfDays }: AvlSheetProps) => {
  return (
    <AVLRow n={numberOfDays}>
      <AVLColumn n={numberOfHours}>
        <AVLHour/>
      </AVLColumn>
    </AVLRow>
  )
}