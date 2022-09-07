import axios from "./axiosInstance";

import {TTimeline} from './types'

export async function fetchTimeline(id:string|undefined): Promise<TTimeline> {
  try{
    const response = await axios.get<TTimeline>('/avlitem/timeline/' + id);
    let timeline = response.data;
    timeline.hourFrom = new Date(timeline.hourFrom);
    timeline.hourTo = new Date(timeline.hourTo);
    timeline.dateFrom = new Date(timeline.dateFrom);
    timeline.dateTo = new Date(timeline.dateTo);
    timeline.avlspans.forEach(element => {
      element.timeFrom = new Date(element.timeFrom);
      element.timeTo = new Date(element.timeTo);
    });
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}