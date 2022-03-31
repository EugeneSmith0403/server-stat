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
    const obj = JSON.parse(JSON.parse(data));
    Logger.log(data);
    cb(obj);
  });
};
