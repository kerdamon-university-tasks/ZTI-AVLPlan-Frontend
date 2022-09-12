import { AvlTimelineCoordinates } from "Api/types";

export type TimelineState = {
  isSelecting: boolean;
  firstSelection: AvlTimelineCoordinates;
}

export type AVLAtomicTimeProps = {
  availabilityType: number, 
  borderStyles: {
    borderStyle: string, 
    borderWidth: number, 
    borderColor?:string, 
    borderTopColor?:string
  }, 
  coordinates:AvlTimelineCoordinates,
  onTimelineClick?: TimelineClickFunc
}

export type TimelineClickFunc = {
  (coordinates: AvlTimelineCoordinates): void
}
