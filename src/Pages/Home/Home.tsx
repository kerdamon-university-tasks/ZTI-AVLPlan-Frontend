import { Card } from "@mui/material";
import AvlSpreadSheet from "Components/AVLSpreadSheet";

const Home = () => {
  return (
    <div style={{margin: 40}}>
      <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
        <AvlSpreadSheet hourFrom={10} hourTo={15} dateFrom={25} dateTo={30} />
      </Card>
    </div>
    )
  }
  
  export default Home;