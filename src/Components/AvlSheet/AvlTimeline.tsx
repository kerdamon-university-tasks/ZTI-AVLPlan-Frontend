import { Box, Stack } from "@mui/material"
import { useState } from "react";
import { AVLColumn, AVLRow, columnWidth, rowHeight } from "./AvlSheetUtilities";
import { AvlTimelineProps } from "./types";

const AVLAtomicTime = ({availabilityType}: {availabilityType: number}) => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: availabilityType == 0 ? 'notAvailable.main' : 'available.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)',
    }}/>
  )
}

const AVLAtomicTimeFull = ({availabilityType}: {availabilityType: number}) => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: availabilityType == 0 ? 'notAvailable.main' : 'available.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white',
    }}/>
  )
}

const AVLAtomicTimeHalf = ({availabilityType}: {availabilityType: number}) => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: availabilityType == 0 ? 'notAvailable.main' : 'available.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white', borderTopColor: 'rgba(255, 255, 255, .5)',
    }}/>
  )
}


const AVLHour = ({hourAvailabilityTypes}: {hourAvailabilityTypes: number[]}) => {
  console.log(hourAvailabilityTypes);
  return(
    <Stack width={columnWidth}>
      <Box>
        <AVLAtomicTimeFull availabilityType={hourAvailabilityTypes[0]}/>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[1]}/>
        <AVLAtomicTimeHalf availabilityType={hourAvailabilityTypes[2]}/>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[3]}/>
      </Box>
    </Stack>
  )
}

export const AvlTimeline = ({ numberOfHours, numberOfDays }: AvlTimelineProps) => {
  const arr = new Array(numberOfDays).fill(new Array(numberOfHours).fill([0, 0, 0, 0]));
  const [stateTable, setStateTable] = useState<number[][][]>(arr); //2x2 table of hours, each hours has 4 quarters. Number represent availability type, that is color

  return (
    <Box sx={{
      backgroundColor: 'available.main',
      borderStyle: 'none none solid solid', borderWidth: 1, borderColor: 'white',
    }}>
      <Stack direction='row'>
        {Array.from(Array(numberOfDays)).map((_, i) => (
            <Stack key={i}>
              {Array.from(Array(numberOfHours)).map((_, j) => (
                <Box key={j}>
                  <AVLHour hourAvailabilityTypes={stateTable[i][j]}/>
                </Box>
              ))}
            </Stack>
        ))}
      </Stack>
    </Box>

  )
}