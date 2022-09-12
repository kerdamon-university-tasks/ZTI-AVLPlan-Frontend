import { AvlSpan, AvlTimelineCoordinates } from "Api/types";
import React from "react";

export type AVLRowColumnProps = {
  n: number;
  children: React.ReactNode;
}

export type AvlSheetProps = {
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlSpans: AvlSpan[];
}

export type AvlTimelineProps = {
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlSpans: AvlSpan[];
}

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
  onTimelineClick: TimelineClickFunc
}

export type TimelineClickFunc = {
  (coordinates: AvlTimelineCoordinates): void
}

export type TimelineData = {
  user: string;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  avlSpans: AvlSpan[];
}