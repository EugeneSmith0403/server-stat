import { Response } from "../enums";

type successResponse = Response.Success;
type error500 = Response.Error500;
type aborted = Response.Aborted;

export type ServerResponse = successResponse | error500 | aborted;
