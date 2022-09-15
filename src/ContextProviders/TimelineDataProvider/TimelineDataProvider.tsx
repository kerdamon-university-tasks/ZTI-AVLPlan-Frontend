import { AvlSpan } from "Api/types";
import useAuth from "Hooks/useAuth";
import React, { useState } from "react";
import { TimelineDataValues } from "./types";

export const TimelineDataContext = React.createContext<TimelineDataValues | undefined>(undefined);

const TimelineDataProvider = ({children}: {children?: React.ReactNode}) => {
  const auth = useAuth();
  const [dateTimeFrom, setDateTimeFrom] = useState<Date>(new Date());
  const [dateTimeTo, setDateTimeTo] = useState<Date>(new Date());
  const [avlspans, setAvlspans] = useState<AvlSpan[]>([]);

  const addAvlSpan = (avlSpan:AvlSpan) => {
    let newAvlSpanArray = [...avlspans];
    newAvlSpanArray.push(avlSpan);
    setAvlspans(newAvlSpanArray);
  }

  const getTimelineData = () => {
    return {
      user: auth.user?.username,
      avlspans,
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
    setAvlspans,
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
