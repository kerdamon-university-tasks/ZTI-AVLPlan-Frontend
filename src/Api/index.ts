import axios from "./axiosInstance";

import {SpreadSheetData, SpreadSheetPostData, TimelineData} from './types'

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

export async function fetchSpreadSheet(id:string|undefined): Promise<SpreadSheetData> {
  try{
    const response = await axios.get<SpreadSheetData>('/avlitem/spreadsheet/' + id);
    let spreadsheet = response.data;
    spreadsheet.avltimelines.forEach(timeline => {
      timeline.dateTimeFrom = new Date(timeline.dateTimeFrom);
      timeline.dateTimeTo = new Date(timeline.dateTimeTo);
    });
    return spreadsheet;
  } catch (error) {
    throw new Error('Failed to fetch spreadsheets');
  }
}

export async function postTimeline(timelineData: TimelineData) {
  try{
    return await axios.post('/avlitem/timeline/', timelineData);
  } catch (error) {
    throw new Error('Failed to post timelines');
  }
}

export async function postSpreadSheet(spreadSheetData: SpreadSheetPostData) {
  try{
    return await axios.post('/avlitem/spreadsheet/', spreadSheetData);
  } catch (error) {
    throw new Error('Failed to post spreadsheet');
  }
}