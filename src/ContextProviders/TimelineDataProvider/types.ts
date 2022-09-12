import { AvlSpan, TTimeline } from "Api/types";

export type TimelineDataValues = {
  getTimelineData(): TTimeline;
  addAvlSpan(avlSpan:AvlSpan): void;
  setDateTimeFrom: React.Dispatch<React.SetStateAction<Date>>;
  setDateTimeTo: React.Dispatch<React.SetStateAction<Date>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setAvlspans: React.Dispatch<React.SetStateAction<AvlSpan[]>>;
  getNumberOfHours(): number;
  getNumberOfDays(): number;
}