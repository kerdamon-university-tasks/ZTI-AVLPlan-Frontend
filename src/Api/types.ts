import { Moment } from "moment";

export type TimelineData = {
  user: string;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlspans: AvlSpan[];
}

export type SpreadSheetData = {
  avltimelines: TimelineData[];
}

export type SpreadSheetPostData = {
  eventName: string;
  dateTimeFrom: Moment | null;
  dateTimeTo: Moment | null;
  avltimelineIds: String[];
}

export type AvlSpan = {
  timeFrom: AvlTimelineCoordinates;
  timeTo: AvlTimelineCoordinates;
  availabilityType: number;
}

export type AvlTimelineCoordinates = {
  quarterIndex: number;
  day: number;
}