import axios from "./axiosInstance";

import {SpreadSheetData, SpreadSheetPostData, TimelineData} from './types'

export async function fetchTimeline(id:string|undefined): Promise<TimelineData> {
  try{
    const response = await axios.get<TimelineData>('/avlitem/timeline/' + id);
    let timeline = response.data;
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}

export async function fetchSpreadSheet(id:string|undefined): Promise<SpreadSheetData> {
  try{
    const response = await axios.get<SpreadSheetData>('/avlitem/spreadsheet/' + id);
    let spreadsheet = response.data;
    spreadsheet.dateTimeFrom = new Date(spreadsheet.dateTimeFrom);
    spreadsheet.dateTimeTo = new Date(spreadsheet.dateTimeTo);
    return spreadsheet;
  } catch (error) {
    throw new Error('Failed to fetch spreadsheets');
  }
}

export async function postTimeline(spreadSheetId: string, timelineData: TimelineData) {
  try{
    console.log('Postuje timelineData');
    console.log(timelineData);
    return await axios.post(`/avlitem/spreadsheet/${spreadSheetId}/timeline`, timelineData);
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