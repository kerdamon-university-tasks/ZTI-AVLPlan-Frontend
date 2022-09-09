import { AvlSpan } from "Api/types";
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