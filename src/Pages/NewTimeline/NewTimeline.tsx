import { Card, Typography } from "@mui/material";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";

const NewTimeline = () => {

  const dateTimeFrom = new Date();
  dateTimeFrom.setDate(1);
  dateTimeFrom.setHours(1);

  const dateTimeTo = new Date();
  dateTimeTo.setDate(5);
  dateTimeTo.setHours(20);

  const timelineDataContext = useTimelineDataContext();
  timelineDataContext.setDateTimeFrom(dateTimeFrom);
  // timelineDataContext.setDateTimeTo(dateTimeTo);
  // timelineDataContext.setUser(timeline.user);

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        {
          <AvlSheet/>
        }
      </Card>
    </div>
    )
  }
  
  export default NewTimeline;