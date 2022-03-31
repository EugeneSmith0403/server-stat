import { Response } from "../enums";
import { error500Handler, successHandler, frozeHandler } from "../helpers";

export const serverResponseHandlerMap = new Map([
  [Response.Success, successHandler],
  [Response.Error500, error500Handler],
  [Response.Aborted, frozeHandler],
]);
