import { Button, Card, Stack, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchSpreadSheet, fetchTimeline, postTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import AvlEditableTimeline from "Components/AvlTimelines/AvlEditableTimeline";
import AvlSummaryTimeline from "Components/AvlTimelines/AvlSummaryTimeline";

const Sheet = () => {
  let {id} = useParams();  
  const timelineDataContext = useTimelineDataContext();
  const {data, isLoading, isError} = useQuery(['timeline'], async () => {
    const timeline = await fetchTimeline(id);
    timelineDataContext.setDateTimeFrom(timeline.dateTimeFrom);
    timelineDataContext.setDateTimeTo(timeline.dateTimeTo);
    timelineDataContext.setUser(timeline.user);
    timelineDataContext.setAvlspans(timeline.avlspans);
    return timeline;
  })

  const {data: spreadsheet, isLoading: isSpreadSheetLoading, isError: isSpreadSheetError} = useQuery(['spreadsheet'], () => fetchSpreadSheet("631f8fefc63b452ffba80210"));

  const handleOnClick = () => {
    postTimeline(timelineDataContext.getTimelineData());
  }

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        <Stack>
          {
            isLoading ? (
              <Typography>Loading</Typography>
            ) : (
              isError ? (
                <Typography>Error</Typography>
              ) : (
                <AvlSheet>
                  <AvlEditableTimeline/>
                </AvlSheet>
              )
            )
          }
          {
            isSpreadSheetLoading ? (
              <Typography>Loading spreadsheet</Typography>
            ) : (
              isSpreadSheetError ? (
                <Typography>Error spreadsheet</Typography>
              ) : (
                <AvlSheet>
                  <AvlSummaryTimeline avlTimelines={spreadsheet.avltimelines}/>
                </AvlSheet>
              )
            )
          }
        </Stack>
      </Card>
      <Card sx={{margin: 5, backgroundColor: "#3E3F59"}}>
        <Typography>Wyślij na serwer</Typography>
        <Button onClick={() => handleOnClick()}>Prześlij</Button>
      </Card>
    </div>
    )
  }
  
  export default Sheet;