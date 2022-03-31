import { Logger } from "../classes";
import { IncomingMessage } from "http";

export const makeServerResponseEvents = (
  request: IncomingMessage,
  cb: Function
): void => {
  let data = "";

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    Logger.log(data);
    const obj = JSON.parse(JSON.parse(data));
    cb(obj);
  });
};
