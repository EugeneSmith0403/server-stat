import { Response } from "../enums";

export const clientResponseHandlerMap = new Map([
  [Response.Aborted, "frozeRequestCount"],
  [Response.Success, "increaseSuccessfulRequestCount"],
  [Response.Error500, "request500RequestCount"],
]);
