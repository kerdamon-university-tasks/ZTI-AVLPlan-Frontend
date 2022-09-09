import { Card, Typography } from "@mui/material";
import AvlSheet from "Components/AvlSheet";

const NewTimeline = () => {

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        {
          <AvlSheet hourFrom={10} hourTo={20} dateFrom={0} dateTo={5} avlSpans={[]}/>
        }
      </Card>
    </div>
    )
  }
  
  export default NewTimeline;