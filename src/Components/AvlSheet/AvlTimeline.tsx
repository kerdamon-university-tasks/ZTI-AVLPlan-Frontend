import { Box, Stack } from "@mui/material"
import { AvlTimelineCoordinates } from "Api/types";
import React from "react";
import { useState } from "react";
import { columnWidth, rowHeight } from "./AvlSheetUtilities";
import { AVLAtomicTimeProps, AvlTimelineProps, TimelineClickFunc, TimelineState } from "./types";

const AVLAtomicTime = ({availabilityType, borderStyles, coordinates, onTimelineClick}: AVLAtomicTimeProps) => {
  return(
    <Box component='a' onClick={() => onTimelineClick(coordinates)}>
      <Box height={rowHeight/4} sx={{
        backgroundColor: availabilityType === 0 ? 'notAvailable.main' : 'available.main',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
        borderStyle: borderStyles.borderStyle, borderWidth: borderStyles.borderWidth, borderColor: borderStyles.borderColor, borderTopColor: borderStyles.borderTopColor,
      }}/>
    </Box>
  )
}

const AVLHour = ({hourAvailabilityTypes, coordinates, onTimelineClick}: {hourAvailabilityTypes: number[], coordinates:AvlTimelineCoordinates, onTimelineClick:TimelineClickFunc}) => {
  return(
    <Stack width={columnWidth}>
      <Box>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[0]} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white'}} coordinates={{quarterIndex: coordinates.quarterIndex, day: coordinates.day}} onTimelineClick={onTimelineClick}/>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[1]} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 1, day: coordinates.day}} onTimelineClick={onTimelineClick}/>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[2]} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white', borderTopColor: 'rgba(255, 255, 255, .5)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 2, day: coordinates.day}} onTimelineClick={onTimelineClick}/>
        <AVLAtomicTime availabilityType={hourAvailabilityTypes[3]} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 3, day: coordinates.day}} onTimelineClick={onTimelineClick}/>
      </Box>
    </Stack>
  )
}

const TimelineContext = React.createContext({
  isSelecting: false, 
  firstSelection: {day: 0, quarterIndex: 0}, 
  secondSelection: {day: 0, quarterIndex: 0}
});

export const AvlTimeline = ({ numberOfHours, numberOfDays, availabilityTypeArray }: AvlTimelineProps) => {
  const [stateTable, setStateTable] = useState<number[][][]>(availabilityTypeArray); //2x2 table of hours, each hours has 4 quarters. Number represent availability type, that is color

  const [timelineState, setTimelineState] = useState<TimelineState>({
    isSelecting: false, 
    firstSelection: {day: 0, quarterIndex: 0}, 
    secondSelection: {day: 0, quarterIndex: 0}
  });

  const onTimelineClick = (coordinates:AvlTimelineCoordinates) => {
    if(!timelineState.isSelecting){
      let hour = Math.floor(coordinates.quarterIndex/4);
      let quarter = coordinates.quarterIndex%4;
      let newStateTable = [...stateTable];
      newStateTable[coordinates.day][hour][quarter] = 1;
      setStateTable(newStateTable);
    }
  }

  return (
    <TimelineContext.Provider value={timelineState}>
      <Box sx={{
        backgroundColor: 'available.main',
        borderStyle: 'none none solid solid', borderWidth: 1, borderColor: 'white',
      }}>
        <Stack direction='row'>
          {Array.from(Array(numberOfDays)).map((_, i) => (
              <Stack key={i}>
                {Array.from(Array(numberOfHours)).map((_, j) => (
                  <Box key={j}> 
                    <AVLHour hourAvailabilityTypes={stateTable[i][j]} coordinates={{day: i, quarterIndex: j * 4}}  onTimelineClick={onTimelineClick}/>
                  </Box>
                ))}
              </Stack>
          ))}
        </Stack>
      </Box>
    </TimelineContext.Provider>
  )
}

// przekazywać koordynaty
// przy kliknięciu dodaje nowego spana do listy avlspanów
// timeline oprócz tablicy stanów ma listę avlspanów
// 