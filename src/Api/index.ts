import axios from "./axiosInstance";

import {TTimeline} from './types'

export async function fetchTimeline(id:string|undefined): Promise<TTimeline> {
  try{
    const reponse = await axios.get<TTimeline>('/avlitem/timeline/' + id);
    return reponse.data;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}