export type TimelineData = {
  user: string;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlspans: AvlSpan[];
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