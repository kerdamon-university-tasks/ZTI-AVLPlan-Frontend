import { AvlSpan, TimelineData } from "Api/types";

export type User = {
  username: string;
}

export type LoggedUserData = {
  username: string;
  token: string;
}

export type AuthContextValues = {
  user?: User;
  login(loginData: LoggedUserData): void;
  logout(): void;
}