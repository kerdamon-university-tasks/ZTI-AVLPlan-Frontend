import { Card, Typography } from "@mui/material";
import AvlSheet from "Components/AvlSheet";

const NewTimeline = () => {

  const dateTimeFrom = new Date();
  dateTimeFrom.setDate(1);
  dateTimeFrom.setHours(10);

  const dateTimeTo = new Date();
  dateTimeTo.setDate(5);
  dateTimeTo.setHours(20);

  console.log(dateTimeFrom);
  console.log(dateTimeTo);
  
  

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        {
          <AvlSheet dateTimeFrom={dateTimeFrom} dateTimeTo={dateTimeTo} avlSpans={[]}/>
        }
      </Card>
    </div>
    )
  }
  
  export default NewTimeline;