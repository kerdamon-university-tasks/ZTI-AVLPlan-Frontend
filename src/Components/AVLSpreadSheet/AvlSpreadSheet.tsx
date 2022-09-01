import AvlSheet from "Components/AvlSheet";
import { AvlSpreadSheetProps } from "./types";

const AvlSpreadSheet = ({ hourFrom, hourTo, dateFrom, dateTo }: AvlSpreadSheetProps) => {
  return (
    <AvlSheet hourFrom={hourFrom} hourTo={hourTo} dateFrom={dateFrom} dateTo={dateTo} />
  )}
  
  export default AvlSpreadSheet;