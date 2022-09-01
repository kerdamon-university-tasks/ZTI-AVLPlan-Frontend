export type TTimeline = {
  user: string;
  hourFrom: string;
  hourTo: string,
  avlspans: AvlSpan[]
}

export type AvlSpan = {
  timeFrom: string;
  timeTo: string;
  availabilityType: number;
}