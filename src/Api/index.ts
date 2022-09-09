import axios from "./axiosInstance";

import {TTimeline} from './types'

export async function fetchTimeline(id:string|undefined): Promise<TTimeline> {
  try{
    const response = await axios.get<TTimeline>('/avlitem/timeline/' + id);
    let timeline = response.data;
    timeline.dateTimeFrom = new Date(timeline.dateTimeFrom);
    timeline.dateTimeTo = new Date(timeline.dateTimeTo);
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}