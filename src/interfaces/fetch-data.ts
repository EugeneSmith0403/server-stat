import { IncomingMessage } from "http";

export interface IFetchData {
  response: IncomingMessage;
  data: string;
  responseTime: number;
  date: number;
}
