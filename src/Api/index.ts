import axios from "./axiosInstance";

import {TimelineData} from './types'

export async function fetchTimeline(id:string|undefined): Promise<TimelineData> {
  try{
    const response = await axios.get<TimelineData>('/avlitem/timeline/' + id);
    let timeline = response.data;
    timeline.dateTimeFrom = new Date(timeline.dateTimeFrom);
    timeline.dateTimeTo = new Date(timeline.dateTimeTo);
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}

export async function postTimeline(timelineData: TimelineData): Promise<void> {
  try{
    return await axios.post('/avlitem/timeline/', timelineData);
  } catch (error) {
    throw new Error('Failed to post timelines');
  }
}