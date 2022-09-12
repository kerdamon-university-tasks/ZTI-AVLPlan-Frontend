import { Button, Card, Typography } from "@mui/material";
import { postTimeline } from "Api";
import AvlSheet from "Components/AvlSheet";
import AvlTimeline from "Components/AvlTimelines";
import useTimelineDataContext from "Hooks/useTimelineDataContext";

const NewTimeline = () => {
  
  const timelineDataContext = useTimelineDataContext();
  let dateTimeFrom = timelineDataContext.getTimelineData().dateTimeFrom;
  let dateTimeTo = timelineDataContext.getTimelineData().dateTimeTo;
  dateTimeFrom.setDate(5);
  dateTimeFrom.setHours(5);
  dateTimeTo.setDate(13);
  dateTimeTo.setHours(13);
  
  timelineDataContext.setDateTimeFrom(dateTimeFrom);
  timelineDataContext.setDateTimeTo(dateTimeTo);

  const handleOnClick = () => {
    console.log(`wysylam na backend`);
    console.log(timelineDataContext.getTimelineData());
    postTimeline(timelineDataContext.getTimelineData());
  }

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        {
          <AvlSheet>
            <AvlTimeline/>
          </AvlSheet>
        }
      </Card>
      <Card sx={{margin: 5, backgroundColor: "#3E3F59"}}>
        <Typography>Wyślij na serwer</Typography>
        <Button onClick={() => handleOnClick()}>Prześlij</Button>
      </Card>
    </div>
    )
  }
  
  export default NewTimeline;