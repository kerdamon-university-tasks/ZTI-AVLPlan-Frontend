import { AvlSpan, TimelineData } from "Api/types";

export type TimelineDataValues = {
  getTimelineData(): TimelineData;
  addAvlSpan(avlSpan:AvlSpan): void;
  setDateTimeFrom: React.Dispatch<React.SetStateAction<Date>>;
  setDateTimeTo: React.Dispatch<React.SetStateAction<Date>>;
  setAvlspans: React.Dispatch<React.SetStateAction<AvlSpan[]>>;
  getNumberOfHours(): number;
  getNumberOfDays(): number;
}