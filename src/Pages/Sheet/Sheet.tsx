import { Button, Card, Stack, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchTimeline, postTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import AvlEditableTimeline from "Components/AvlTimelines/AvlEditableTimeline";
import AvlSummaryTimeline from "Components/AvlTimelines/AvlSummaryTimeline";

const Sheet = () => {
  let {id} = useParams();  
  const timelineDataContext = useTimelineDataContext();
  const {isLoading, isError} = useQuery(['timeline'], async () => {
    const timeline = await fetchTimeline(id);
    timelineDataContext.setDateTimeFrom(timeline.dateTimeFrom);
    timelineDataContext.setDateTimeTo(timeline.dateTimeTo);
    timelineDataContext.setUser(timeline.user);
    timelineDataContext.setAvlspans(timeline.avlspans);
    return timeline;
  })

  const handleOnClick = () => {
    postTimeline(timelineDataContext.getTimelineData());
  }

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        {
          isLoading ? (
            <Typography>Loading</Typography>
          ) : (
            isError ? (
              <Typography>Error</Typography>
            ) : (
              <Stack>
                <AvlSheet>
                  <AvlEditableTimeline/>
                </AvlSheet>
                <AvlSheet>
                  <AvlSummaryTimeline/>
                </AvlSheet>
              </Stack>
            )
          )
        }
      </Card>
      <Card sx={{margin: 5, backgroundColor: "#3E3F59"}}>
        <Typography>Wyślij na serwer</Typography>
        <Button onClick={() => handleOnClick()}>Prześlij</Button>
      </Card>
    </div>
    )
  }
  
  export default Sheet;