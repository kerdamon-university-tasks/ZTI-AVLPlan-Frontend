export type TTimeline = {
  user: string;
  hourFrom: Date;
  hourTo: Date;
  dateFrom: Date;
  dateTo: Date;
  avlspans: AvlSpan[];
}

export type AvlSpan = {
  timeFrom: Date;
  timeTo: Date;
  availabilityType: number;
}