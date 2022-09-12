import { AvlSpan } from "Api/types";

export const rowHeight = 50
export const columnWidth = 46

export const modifyAvailabilityTypeArray = (availabilityTypeArray:any[], avlSpan: AvlSpan, numberOfHours:number) => {
  let quarterIndex = avlSpan.timeFrom.quarterIndex;
  for (let day = avlSpan.timeFrom.day; day <= avlSpan.timeTo.day; day++) {
    while(quarterIndex < numberOfHours * 4){
      let hour = Math.floor(quarterIndex/4);
      let quarter = quarterIndex%4;
      availabilityTypeArray[day][hour][quarter] = 1;
      quarterIndex++;
      if(day >= avlSpan.timeTo.day && quarterIndex >= avlSpan.timeTo.quarterIndex)
        break;
    }
    quarterIndex = 0;
  }
}