import { Card, Typography } from "@mui/material";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";

const NewTimeline = () => {
  
  const timelineDataContext = useTimelineDataContext();
  let dateTimeFrom = timelineDataContext.getTimelineData().dateTimeFrom;
  let dateTimeTo = timelineDataContext.getTimelineData().dateTimeTo;
  dateTimeFrom.setDate(5);
  dateTimeFrom.setHours(5);
  dateTimeTo.setDate(13);
  dateTimeTo.setHours(13);
  
  timelineDataContext.setDateTimeTo(dateTimeTo);


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