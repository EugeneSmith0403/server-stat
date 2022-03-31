import { Endpoint } from "../enums";
import { IFetchData } from "../interfaces";
import { IncomingMessage } from "http";
import * as https from "https";
import { Logger } from "../classes";

export const fetchData = (): Promise<IFetchData | Error> => {
  const startTime = new Date().getTime();
  return new Promise((resolve, reject) => {
    let data = "";
    Logger.log("start fetch data!");
    https
      .get(Endpoint.Fundraiser, (response: IncomingMessage) => {
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          const endTime = new Date().getTime();
          resolve({
            response: response,
            data: data,
            responseTime: endTime - startTime,
            date: new Date().getTime(),
          });
          Logger.log("resolved fetch data!");
        });
      })
      .on("error", (err: Error) => {
        reject(err);
        Logger.log("Error: " + err.message);
      });
  });
};
