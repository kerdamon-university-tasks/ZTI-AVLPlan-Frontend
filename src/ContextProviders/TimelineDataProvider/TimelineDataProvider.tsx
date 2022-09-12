import { AvlSpan } from "Api/types";
import { AvlSheetProps, TimelineData } from "Components/AvlSheet/types";
import React, { useState } from "react";
import { TimelineDataValues } from "./types";

export const TimelineDataContext = React.createContext<TimelineDataValues | undefined>(undefined);

const TimelineDataProvider = ({children}: {children?: React.ReactNode}) => {
  const [dateTimeFrom, setDateTimeFrom] = useState<Date>(new Date());
  const [dateTimeTo, setDateTimeTo] = useState<Date>(new Date());
  const [user, setUser] = useState('');
  const [avlSpans, setAvlSpans] = useState<AvlSpan[]>([]);

  const addAvlSpan = (avlSpan:AvlSpan) => {
    let newAvlSpanArray = [...avlSpans];
    newAvlSpanArray.push(avlSpan);
    setAvlSpans(newAvlSpanArray);
  }

  const getTimelineData = () => {
    return {
      user,
      dateTimeFrom,
      dateTimeTo,
      avlSpans,
    }
  }

  const getNumberOfHours = () => {
    return dateTimeTo.getHours() - dateTimeFrom.getHours();
  }

  const getNumberOfDays = () => {
    return dateTimeTo.getDate() - dateTimeFrom.getDate() + 1;
  }

  const values = {
    getTimelineData,
    addAvlSpan,
    setDateTimeFrom,
    setDateTimeTo,
    setUser,
    setAvlSpans,
    getNumberOfHours,
    getNumberOfDays
  }

  return (
    <TimelineDataContext.Provider value={values}>
      {children}
    </TimelineDataContext.Provider>
  )
}

export default TimelineDataProvider;
