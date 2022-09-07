export type TTimeline = {
  user: string;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlspans: AvlSpan[];
}

export type AvlSpan = {
  timeFrom: Date;
  timeTo: Date;
  availabilityType: number;
}