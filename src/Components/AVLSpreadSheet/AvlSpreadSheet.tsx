import { Card } from "@mui/material";
import AvlSheet from "Components/AvlSheet";
import { AvlSpreadSheetProps } from "./types";

const AvlSpreadSheet = ({ numberOfHours, numberOfDays}: AvlSpreadSheetProps) => {
  return (
    <Card variant="outlined" sx={{padding: 5, backgroundColor: "#3E3F59"}}>
      <AvlSheet numberOfHours={5} numberOfDays={5}/>
    </Card>
  )}
  
  export default AvlSpreadSheet;