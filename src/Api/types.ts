export type TTimeline = {
  user: string;
  hourFrom: number;
  hourTo: number;
  avlspans: AvlSpan[];
}

export type AvlSpan = {
  timeFrom: string;
  timeTo: string;
  availabilityType: number;
}