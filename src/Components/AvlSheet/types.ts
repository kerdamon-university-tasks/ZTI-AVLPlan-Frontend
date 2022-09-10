import { AvlSpan, AvlTimelineCoordinates } from "Api/types";
import React from "react";

export type AVLRowColumnProps = {
  n: number;
  children: React.ReactNode;
}

export type AvlSheetProps = {
  hourFrom: number;
  hourTo: number;
  dateFrom: number;
  dateTo: number;
  avlSpans: AvlSpan[];
}

export type AvlTimelineProps = {
  numberOfHours: number;
  numberOfDays: number;
  availabilityTypeArray: number[][][];
}

export type TimelineState = {
  isSelecting: boolean;
  firstSelection: AvlTimelineCoordinates;
  secondSelection: AvlTimelineCoordinates;
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
  onTimelineClick: TimelineClickFunc
}

export type TimelineClickFunc = {
  (coordinates: AvlTimelineCoordinates): void
}