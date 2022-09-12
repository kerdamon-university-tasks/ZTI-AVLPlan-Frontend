import { AvlTimelineCoordinates } from "Api/types";

export type TimelineState = {
  isSelecting: boolean;
  firstSelection: AvlTimelineCoordinates;
}

export type AVLEditableAtomicTimeProps = {
  availabilityType: number, 
  borderStyles: {
    borderStyle: string, 
    borderWidth: number, 
    borderColor?:string, 
    borderTopColor?:string
  }, 
  coordinates:AvlTimelineCoordinates,
  onTimelineClick: TimelineClickFunc
}

export type AVLSummaryAtomicTimeProps = {
  availabilityValue: number, 
  borderStyles: {
    borderStyle: string, 
    borderWidth: number, 
    borderColor?:string, 
    borderTopColor?:string
  },
  maxValue: number,
  coordinates:AvlTimelineCoordinates
}


export type TimelineClickFunc = {
  (coordinates: AvlTimelineCoordinates): void
}
