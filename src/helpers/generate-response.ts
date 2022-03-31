import { ServerResponse } from "../types";
import { Response } from "../enums";

const isResponseSuccess = (nounce: number): boolean => {
  return nounce >= 1 && nounce <= 6;
};

const isOnError500 = (nounce: number): boolean => {
  return nounce > 6 && nounce <= 8;
};

export const generateResponse = (): ServerResponse => {
  const nounce = Math.floor(Math.random() * 10) + 1;

  if (isResponseSuccess(nounce)) {
    return Response.Success;
  }

  if (isOnError500(nounce)) {
    return Response.Error500;
  }
  return Response.Aborted;
};
