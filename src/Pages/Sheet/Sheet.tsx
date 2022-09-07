import { Card, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";

const Sheet = () => {
  let {id} = useParams();
  
  const {data: timeline, isLoading, isError} = useQuery(['timeline'], () => fetchTimeline(id)) // dodać id do zapytania

  console.log(timeline?.hourFrom);
  console.log(timeline?.hourTo);

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
              <AvlSheet hourFrom={4} hourTo={5} dateFrom={25} dateTo={30} />
            )
          )
        }
      </Card>
    </div>
    )
  }
  
  export default Sheet;