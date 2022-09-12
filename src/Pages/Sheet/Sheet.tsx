import { Button, Card, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchTimeline, postTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";

const Sheet = () => {
  let {id} = useParams();  
  const timelineDataContext = useTimelineDataContext();
  const {data: timeline, isLoading, isError} = useQuery(['timeline'], async () => {
    const timeline = await fetchTimeline(id);
    timelineDataContext.setDateTimeFrom(timeline.dateTimeFrom);
    timelineDataContext.setDateTimeTo(timeline.dateTimeTo);
    timelineDataContext.setUser(timeline.user);
    // console.log(`tmeline.avlspans`);
    // console.log(timeline.avlspans);
    timelineDataContext.setAvlspans(timeline.avlspans);
    // console.log(`timelineDataContext.getTimelineData().avlSpans`);
    // console.log(timelineDataContext.getTimelineData().avlSpans);
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
              <AvlSheet/>
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