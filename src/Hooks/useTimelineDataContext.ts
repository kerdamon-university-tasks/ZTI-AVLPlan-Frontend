import { TimelineDataContext } from "ContextProviders/TimelineDataProvider/TimelineDataProvider";
import { TimelineDataValues } from "ContextProviders/TimelineDataProvider/types";
import { useContext } from "react";

const useTimelineDataContext = (): TimelineDataValues => {
  const timelineDataContext = useContext(TimelineDataContext);
  if(!timelineDataContext){
    throw new Error('No data context available here');
  }
  return timelineDataContext;
}

export default useTimelineDataContext;