import { Moment } from "moment";

export type TimelineData = {
  user?: string;
  avlspans: AvlSpan[];
}

export type SpreadSheetData = {
  id: string;
  eventName: string;
  dateTimeFrom: Date;
  dateTimeTo: Date;
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

export type LoginData = {
  username: string;
  password: string;
}

export type ServerError = { 
  timestamp: string,
  status: number,
  error: string,
  trace: string,
  message: string,
  path: string
 };