import { AvlSpan, TimelineData } from "Api/types";

export type User = {
  username: string;
}

export type LoginData = {
  username: string;
  token: string;
}

export type AuthContextValues = {
  user?: User;
  login(loginData: LoginData): void;
  logout(): void;
}