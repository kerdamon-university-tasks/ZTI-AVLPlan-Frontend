import qs from "qs";
import axios from "./axiosInstance";
import {LoginData, SpreadSheetData, SpreadSheetPostData, TimelineData} from './types'

const getToken = (): string => {
  const token = localStorage.getItem("access_token");
  if(!token)
    throw new Error("Token is empty");
  const beareredToken = "Bearer " + token;
  console.log(beareredToken);
  
  return beareredToken;
}

export async function fetchTimeline(id:string|undefined): Promise<TimelineData> {
  try{

    const response = await axios.get<TimelineData>('/avlitem/timeline/' + id, { headers: { 'Authorization': getToken() } });
    let timeline = response.data;
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}

export async function fetchSpreadSheet(id:string|undefined): Promise<SpreadSheetData> {
  try{
    const response = await axios.get<SpreadSheetData>('/avlitem/spreadsheet/' + id, { headers: { 'Authorization': getToken() } });
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
    return await axios.post(`/avlitem/spreadsheet/${spreadSheetId}/timeline`, timelineData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getToken() } });
  } catch (error) {
    throw new Error('Failed to post timelines');
  }
}

export async function postSpreadSheet(spreadSheetData: SpreadSheetPostData) {
  try{
    const token = getToken();
    console.log(`Token: ${token}`);
    const headers = {
      Authorization: token
    }
    return await axios.post('/avlitem/spreadsheet/', spreadSheetData, { headers: headers });
  } catch (error) {
    throw new Error('Failed to post spreadsheet');
  }
}

export async function login(loginData: LoginData) {
  try{
    const response = await axios.post('/login', qs.stringify(loginData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to login: ${error}`);
  }
}