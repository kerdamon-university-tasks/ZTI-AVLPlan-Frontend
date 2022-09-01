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
}

export type AvlTimelineProps = {
  numberOfHours: number;
  numberOfDays: number;
}