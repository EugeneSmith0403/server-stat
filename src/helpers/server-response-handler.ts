import { ServerResponse } from "http";
import { Response } from "../enums";
import { wait } from "./wait";

export const error500Handler = (response: ServerResponse): void => {
  response.statusCode = 500;
  response.end();
};

export const successHandler = (
  response: ServerResponse,
  result: Response
): void => {
  response.statusCode = 200;
  response.end(JSON.stringify(result));
};

export const frozeHandler = async () => {
  await wait(15000);
};
