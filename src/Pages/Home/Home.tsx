import { Card } from "@mui/material";
import AvlSpreadSheet from "Components/AVLSpreadSheet";

const Home = () => {
  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        <AvlSpreadSheet numberOfDays={14} numberOfHours={10} />
      </Card>
    </div>
    )
  }
  
  export default Home;