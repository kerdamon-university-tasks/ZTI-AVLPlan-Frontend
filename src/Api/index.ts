import { AxiosError } from "axios";
import qs from "qs";
import axios from "./axiosInstance";
import {LoginData, SpreadSheetData, SpreadSheetPostData, TimelineData, ServerError} from './types'

const getToken = (): string => {
  const token = localStorage.getItem("access_token");
  if(!token)
    throw new Error("Token is empty");
  // const beareredToken = "Bearer " + token;
  // console.log(beareredToken);
  return token;
}

export async function fetchTimeline(id:string|undefined): Promise<TimelineData> {
  try{
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.get<TimelineData>('/avlitem/timeline/' + id, config);
    let timeline = response.data;
    return timeline;
  } catch (error) {
    throw new Error('Failed to fetch timelines');
  }
}

export async function fetchSpreadSheet(id:string|undefined): Promise<SpreadSheetData> {
  try{
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.get<SpreadSheetData>('/avlitem/spreadsheet/' + id, config);
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
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    return await axios.post(`/avlitem/spreadsheet/${spreadSheetId}/timeline`, timelineData, config);
  } catch (error) {
    throw new Error('Failed to post timelines');
  }
}

export async function postSpreadSheet(spreadSheetData: SpreadSheetPostData) {
  try{
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.post('/avlitem/spreadsheet', spreadSheetData, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to post spreadsheet');
  }
}

export async function login(loginData: LoginData) {
  try{
    const response = await axios.post('/login', loginData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    throw new Error(err.response?.data.message);
  }
}

export async function registerNewUser(loginData: LoginData) {
  try{
    const response = await axios.post('/register', loginData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    throw new Error(err.response?.data.message);
  }
}