import { Card, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchTimelines } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";

const Sheet = () => {
  let {id} = useParams();
  const {data: timelines, isLoading, isError} = useQuery(['timelines'], fetchTimelines) // dodać id do zapytania

  isError ? (
    console.log('Nie udało się pobrać tych timelinów')
  ) : (
    console.log(timelines)
  )

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
              <AvlSheet hourFrom={10} hourTo={15} dateFrom={25} dateTo={30} />
            )
          )
        }
      </Card>
    </div>
    )
  }
  
  export default Sheet;