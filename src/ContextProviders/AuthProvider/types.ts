import { AvlSpan, TimelineData } from "Api/types";

export type User = {
  username: string;
}

export type LoggedUserData = {
  username: string;
  token: TokenData;
}

export type TokenData = {
  access_token: string;
  refresh_token: string;
}

export type AuthContextValues = {
  user?: User;
  login(loginData: LoggedUserData): void;
  logout(): void;
}