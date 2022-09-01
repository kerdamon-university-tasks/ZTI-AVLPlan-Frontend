import axios from "./axiosInstance";

import {TTimeline, AvlSpan} from './types'

export async function fetchTimelines(): Promise<TTimeline[]> {
  try{
    const reponse = await axios.get<TTimeline[]>('/timelines');
    return reponse.data;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}