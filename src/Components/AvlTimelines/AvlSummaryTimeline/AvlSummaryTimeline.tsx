import { Box, Stack } from "@mui/material"
import { AvlSpan, AvlTimelineCoordinates, TimelineData } from "Api/types";
import { useState } from "react";
import { columnWidth, modifyAvailabilityTypeArray, rowHeight } from "../AvlSheetUtilities";
import { AVLSummaryAtomicTimeProps } from "../types";
import { theme } from "Theme";
import { alpha } from "@mui/material";

export const AvlSummaryTimeline = ({avlTimelines}: {avlTimelines: TimelineData[]}) => {
  //craete availabilityTypeArray for teach timeline -> availabilityTypeArray[]
  //add current live state table values passed in props: 
  //{liveStateTable}: {liveStateTable:number[][][]}
  //calculate summaryStateArray -> summaryStateArray, max value
  
  let numberOfHours = avlTimelines[0].dateTimeTo.getHours() - avlTimelines[0].dateTimeFrom.getHours();
  let numberOfDays = avlTimelines[0].dateTimeTo.getDate() - avlTimelines[0].dateTimeFrom.getDate() + 1;

  let availabilityTypeArrays:number[][][][] = [];
  avlTimelines.forEach(timeline => {
    availabilityTypeArrays.push(crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, timeline.avlspans));
  });

  let maxValue = 0;
  let cleanSummaryStateArray = crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, []);
  availabilityTypeArrays.forEach(availabilityTypeArray => {
    for(let i = 0; i < numberOfDays; i++){
      for(let j = 0; j < numberOfHours; j++){
        for(let q = 0; q < 4; q++){
          cleanSummaryStateArray[i][j][q] += availabilityTypeArray[i][j][q];
          if(cleanSummaryStateArray[i][j][q] > maxValue){
            maxValue = cleanSummaryStateArray[i][j][q];
          }
        }
      }
    }    
  });

  const [summaryStateArray] = useState<number[][][]>(cleanSummaryStateArray); //2x2 table of hours, each hours has 4 quarters. Number represent availability value, that is how many users are available in that time

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
                  <AVLHour hourAvailabilityValues={summaryStateArray[i][j]} maxValue={maxValue} coordinates={{day: i, quarterIndex: j * 4}}/>
                </Box>
              ))}
            </Stack>
        ))}
      </Stack>
    </Box>
  )
}

const AVLAtomicTime = ({availabilityValue, borderStyles, maxValue, coordinates}: AVLSummaryAtomicTimeProps) => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: alpha(theme.palette.notAvailable.main, 1 - availabilityValue/maxValue),
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: borderStyles.borderStyle, borderWidth: borderStyles.borderWidth, borderColor: borderStyles.borderColor, borderTopColor: borderStyles.borderTopColor,
    }}/>
  )
}

const AVLHour = ({hourAvailabilityValues, maxValue, coordinates}: {hourAvailabilityValues: number[], maxValue: number, coordinates:AvlTimelineCoordinates}) => {
  return(
    <Stack width={columnWidth}>
      <Box>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[0]} maxValue={maxValue} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white'}} coordinates={{quarterIndex: coordinates.quarterIndex, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[1]} maxValue={maxValue} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 1, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[2]} maxValue={maxValue} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white', borderTopColor: 'rgba(255, 255, 255, .5)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 2, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[3]} maxValue={maxValue} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 3, day: coordinates.day}}/>
      </Box>
    </Stack>
  )
}

const crateAvailabilityTypeArrayFromAvlSpans = (numberOfDays:number, numberOfHours:number, avlSpans: AvlSpan[]) => {
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

export default AvlSummaryTimeline;
