import { Response } from "../enums";
import { _error500Handler, _successHandler, frozeHandler } from "../helpers";

export const serverResponseHandlerMap = new Map([
  [Response.Success, _successHandler],
  [Response.Error500, _error500Handler],
  [Response.Aborted, frozeHandler],
]);
