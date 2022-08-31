import { Card } from "@mui/material";
import AvlSheet from "Components/AvlSheet";
import { AvlSpreadSheetProps } from "./types";

const AvlSpreadSheet = ({ numberOfHours, numberOfDays}: AvlSpreadSheetProps) => {
  return (
    <Card sx={{padding: 5, backgroundColor: "#3E3F59"}}>
      <AvlSheet numberOfHours={numberOfHours} numberOfDays={numberOfDays}/>
    </Card>
  )}
  
  export default AvlSpreadSheet;