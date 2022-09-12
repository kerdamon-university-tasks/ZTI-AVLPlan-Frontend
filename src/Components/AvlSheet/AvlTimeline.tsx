import { Box, Stack } from "@mui/material"
import { AvlSpan, AvlTimelineCoordinates } from "Api/types";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import React from "react";
import { useState } from "react";
import { columnWidth, modifyAvailabilityTypeArray, rowHeight } from "./AvlSheetUtilities";
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
});

const crateAvailabilityTypeArrayFromAvlSpans = (numberOfDays:number, numberOfHours:number, hourFrom:number, avlSpans: AvlSpan[]) => {
  const availabilityTypeArray = new Array(numberOfDays);
  for (let day = 0; day < numberOfDays; day++) {
    availabilityTypeArray[day] = new Array(numberOfHours);
    for (let hour = 0; hour < numberOfHours; hour++) {
      availabilityTypeArray[day][hour] = new Array(4);
      for (let quarter = 0; quarter < 4; quarter++) {
        availabilityTypeArray[day][hour][quarter] = 0
      }
    }
  }

  avlSpans.forEach(avlSpan => {
    modifyAvailabilityTypeArray(availabilityTypeArray, avlSpan, numberOfHours);
  });

  return availabilityTypeArray;
}

export const AvlTimeline = () => {
  const timelineDataContext = useTimelineDataContext();

  const numberOfHours = timelineDataContext.getNumberOfHours();
  const numberOfDays = timelineDataContext.getNumberOfDays();
  const timelineData = timelineDataContext.getTimelineData();

  const availabilityTypeArray = crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, timelineData.dateTimeFrom.getHours(), timelineData.avlSpans);

  const [stateTable, setStateTable] = useState<number[][][]>(availabilityTypeArray); //2x2 table of hours, each hours has 4 quarters. Number represent availability type, that is color

  const [timelineState, setTimelineState] = useState<TimelineState>({
    isSelecting: false, 
    firstSelection: {day: 0, quarterIndex: 0}, 
  });

  const onTimelineClick = (coordinates:AvlTimelineCoordinates) => {
    let hour = Math.floor(coordinates.quarterIndex/4);
    let quarter = coordinates.quarterIndex%4;
    let newStateTable = [...stateTable];

    if(timelineState.isSelecting){
      
      let newAvlSpan = {
        timeFrom: {
          quarterIndex: timelineState.firstSelection.quarterIndex,
          day: timelineState.firstSelection.day
        },
        timeTo: {
          quarterIndex: coordinates.quarterIndex + 1,
          day: coordinates.day
        },
        availabilityType: 1
      };

      timelineDataContext.addAvlSpan(newAvlSpan);

      setTimelineState({
        isSelecting: false, 
        firstSelection: {day: 0, quarterIndex: 0}, 
      });

      newStateTable = [...stateTable];
      modifyAvailabilityTypeArray(newStateTable, newAvlSpan, numberOfHours);
      setStateTable(newStateTable);

    } else {
      setTimelineState({
          isSelecting: true, 
          firstSelection: {day: coordinates.day, quarterIndex: coordinates.quarterIndex}, 
        });
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