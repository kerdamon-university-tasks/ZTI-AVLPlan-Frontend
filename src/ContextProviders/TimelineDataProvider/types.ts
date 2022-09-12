import { AvlSpan } from "Api/types";
import { TimelineData } from "Components/AvlSheet/types";

export type TimelineDataValues = {
  getTimelineData(): TimelineData;
  addAvlSpan(avlSpan:AvlSpan): void;
  setDateTimeFrom: React.Dispatch<React.SetStateAction<Date>>;
  setDateTimeTo: React.Dispatch<React.SetStateAction<Date>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setAvlSpans: React.Dispatch<React.SetStateAction<AvlSpan[]>>;
  getNumberOfHours(): number;
  getNumberOfDays(): number;
}