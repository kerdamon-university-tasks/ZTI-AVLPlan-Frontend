import AvlSheet from "Components/AvlSheet";
import { AvlSpreadSheetProps } from "./types";

const AvlSpreadSheet = ({ numberOfHours, numberOfDays}: AvlSpreadSheetProps) => {
  return (
    <AvlSheet numberOfHours={numberOfHours} numberOfDays={numberOfDays}/>
  )}
  
  export default AvlSpreadSheet;