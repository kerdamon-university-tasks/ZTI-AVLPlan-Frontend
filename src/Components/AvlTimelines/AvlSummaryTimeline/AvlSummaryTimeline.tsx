import { Box, Stack } from "@mui/material"
import { AvlSpan, AvlTimelineCoordinates } from "Api/types";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import { useState } from "react";
import { columnWidth, modifyAvailabilityTypeArray, rowHeight } from "../AvlSheetUtilities";
import { AVLSummaryAtomicTimeProps } from "../types";
import { useQuery } from '@tanstack/react-query';
import { fetchSpreadSheet } from "Api";

export const AvlSummaryTimeline = () => {

  const {data: spreadsheet, isLoading, isError} = useQuery(['spreadsheet'], () => fetchSpreadSheet("631f8fefc63b452ffba80210"));

  console.log(spreadsheet);
  

  //fetch all timelines -> timelines[]

  //craete availabilityTypeArray for teach timeline -> availabilityTypeArray[]
  //add current live state table values passed in props: 
  //{liveStateTable}: {liveStateTable:number[][][]}
  //calculate summaryStateArray -> summaryStateArray, max value
  

  // const {data: timeline, isLoading, isError} = useQuery(['timeline'], async () => {
  //   timelineIds.forEach(timelineId => {
      
  //   });
  //   const timeline = await fetchTimeline(id);
  //   timelineDataContext.setDateTimeFrom(timeline.dateTimeFrom);
  //   timelineDataContext.setDateTimeTo(timeline.dateTimeTo);
  //   timelineDataContext.setUser(timeline.user);
  //   timelineDataContext.setAvlspans(timeline.avlspans);
  //   return timeline;
  // })

  
  const timelineDataContext = useTimelineDataContext();

  const numberOfHours = timelineDataContext.getNumberOfHours();
  const numberOfDays = timelineDataContext.getNumberOfDays();
  const timelineData = timelineDataContext.getTimelineData();

  const availabilityTypeArray = crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, timelineData.avlspans);

  const [stateTable, setStateTable] = useState<number[][][]>(availabilityTypeArray); //2x2 table of hours, each hours has 4 quarters. Number represent availability type, that is color

  // const availabilityTypeArray = crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, timelineData.avlspans);
  // const availabilityTypeArray2 = crateAvailabilityTypeArrayFromAvlSpans(numberOfDays, numberOfHours, timelineData.avlspans);

  // const availabilityTypeArrays = [availabilityTypeArray, availabilityTypeArray2];

  // let cleanSummaryStateArray = new Array(numberOfDays);
  // for (let day = 0; day < numberOfDays; day++) {
  //   availabilityTypeArray[day] = new Array(numberOfHours);
  //   for (let hour = 0; hour < numberOfHours; hour++) {
  //     availabilityTypeArray[day][hour] = new Array(4);
  //     for (let quarter = 0; quarter < 4; quarter++) {
  //       availabilityTypeArray[day][hour][quarter] = 0
  //     }
  //   }
  // }

  // availabilityTypeArrays.forEach(availabilityTypeArray => {
  //   for(let i = 0; i < numberOfDays; i++){
  //     for(let j = 0; j < numberOfDays; j++){
  //       for(let q = 0; q < numberOfDays; q++){
  //         cleanSummaryStateArray[i][j][q] += availabilityTypeArray[i][j][q];
  //       }
  //     }
  //   }    
  // });

  // const [summaryStateArray, setSummaryStateArray] = useState<number[][][]>(cleanSummaryStateArray); //2x2 table of hours, each hours has 4 quarters. Number represent availability value, that is how many users are available in that time

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
                  <AVLHour hourAvailabilityValues={stateTable[i][j]} coordinates={{day: i, quarterIndex: j * 4}}/>
                </Box>
              ))}
            </Stack>
        ))}
      </Stack>
    </Box>
  )
}

const AVLAtomicTime = ({availabilityValue, borderStyles, coordinates}: AVLSummaryAtomicTimeProps) => {
  return(
    <Box height={rowHeight/4} sx={{
      backgroundColor: availabilityValue === 0 ? 'notAvailable.main' : 'available.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
      borderStyle: borderStyles.borderStyle, borderWidth: borderStyles.borderWidth, borderColor: borderStyles.borderColor, borderTopColor: borderStyles.borderTopColor,
    }}>{availabilityValue}</Box>
  )
}

const AVLHour = ({hourAvailabilityValues, coordinates}: {hourAvailabilityValues: number[], coordinates:AvlTimelineCoordinates}) => {
  return(
    <Stack width={columnWidth}>
      <Box>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[0]} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white'}} coordinates={{quarterIndex: coordinates.quarterIndex, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[1]} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 1, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[2]} borderStyles={{borderStyle: 'solid solid none none', borderWidth: 1, borderColor: 'white', borderTopColor: 'rgba(255, 255, 255, .5)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 2, day: coordinates.day}}/>
        <AVLAtomicTime availabilityValue={hourAvailabilityValues[3]} borderStyles={{borderStyle: 'dashed solid none none', borderWidth: 1, borderColor: 'rgba(255, 255, 255, .8)'}} coordinates={{quarterIndex: coordinates.quarterIndex + 3, day: coordinates.day}}/>
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
