import { Card, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";

const Sheet = () => {
  let {id} = useParams();  
  const {data: timeline, isLoading, isError} = useQuery(['timeline'], () => fetchTimeline(id)) // dodać id do zapytania

  

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
              <AvlSheet hourFrom={timeline.dateTimeFrom.getHours()} hourTo={timeline.dateTimeTo.getHours()} dateFrom={timeline.dateTimeFrom.getDate()} dateTo={timeline.dateTimeTo.getDate()} />
            )
          )
        }
      </Card>
    </div>
    )
  }
  
  export default Sheet;