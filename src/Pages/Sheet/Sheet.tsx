import { Card } from "@mui/material";
import AvlSpreadSheet from "Components/AVLSpreadSheet";
import { useQuery } from '@tanstack/react-query';
import { fetchTimelines } from "Api";
import { useParams } from "react-router-dom";

const Sheet = () => {
  const {data: timelines, isError} = useQuery(['timelines'], fetchTimelines)
  let {id} = useParams();

  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        <AvlSpreadSheet hourFrom={10} hourTo={15} dateFrom={25} dateTo={30} />
      </Card>
      <>
      {
        isError ? (
          console.log('Nie udało się pobrać tych timelinów')
        ) : (
          console.log(timelines)
        )
      }
      </>
    </div>
    )
  }
  
  export default Sheet;